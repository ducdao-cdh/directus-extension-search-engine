import { Client, SearchClient } from "typesense"
import { execCode } from "../utils"
import { BaseService } from "./base.service"
import { COLLECTION_TYPESENSE_SCHEMA, EXTENSION_NAME } from "../data"
import { SearchParams } from "typesense/lib/Typesense/Documents"
import { MultiSearchRequestSchema, MultiSearchRequestsSchema } from "typesense/lib/Typesense/MultiSearch"
import { ServiceUnavailableError } from "@directus/errors"

export class TypesenseClass extends BaseService {

    public client: Client
    public searchClient: SearchClient
    public dataIndex: any

    constructor(context: any) {
        super({ context })


        // this.logger.debug({
        //     TYPESENSE_API_URLS: this.env['TYPESENSE_API_URLS'],
        //     TYPESENSE_API_KEY: this.env['TYPESENSE_API_KEY'],
        //     // TYPESENSE_INDEXING: this.env['TYPESENSE_INDEXING']
        // })

        this.client = new Client({
            nodes: this.env['TYPESENSE_API_URLS'],
            apiKey: this.env.TYPESENSE_API_KEY
        })

        this.searchClient = new SearchClient({
            nodes: this.env['TYPESENSE_API_URLS'],
            apiKey: this.env.TYPESENSE_API_KEY
        })

        this.dataIndex = this.env.TYPESENSE_INDEXING

    }

    async getSchemaIndex(mode?: "trigger_event" | "run_cronjob") {
        let schema = await this.getSchema()
        let service = new this.services.ItemsService(COLLECTION_TYPESENSE_SCHEMA, { schema })

        let query: any = {
            filter: {
                status: {
                    _eq: "published"
                }
            },
            fields: ['*'],
            sort: ["sort", "id"],
            limit: -1
        }

        if (mode) {
            query.filter["mode"] = {
                _eq: mode
            }
        }

        return service.readByQuery(query)
    }


    async initCollectionSchema(payload: { schemas?: string[], collections?: string[], mode?: "trigger_event" | "run_cronjob" } | any) {
        try {

            let [collections, dataIndex] = await Promise.all([
                this.client.collections().retrieve(),
                this.getSchemaIndex(payload.mode)
            ])

            if (payload.schemas) {
                dataIndex = dataIndex.filter((item: any) => payload.schemas.includes(item.schema_name))
            }

            if (payload.collections) {
                dataIndex = dataIndex.filter((item: any) => payload.collections.includes(item.collection))
            }

            dataIndex = dataIndex.filter((item: any) => !collections.some((ite: any) => ite.name === item.schema_name))

            // this.logger.debug({ collections })

            for (let item of dataIndex) {
                try {
                    await this.client.collections().create({
                        ...item.schema,
                        name: item.schema_name
                    })
                } catch (error: any) {
                    this.log.debug(`[!] Schema "${item.schema_name}" existed`)
                    this.log.error("Error initCollectionSchema: " + error?.message)
                    this.log.debug(error)

                }
            }

            this.log.debug("[!] Initial schema success !")

        } catch (error) {
            this.log.debug("[-] Error initCollections")
            this.log.debug(error)
        }
    }


    async actionRefreshIndexData(mode?: "trigger_event" | "run_cronjob") {
        try {

            let dataIndex = await this.getSchemaIndex(mode)

            let schemas = dataIndex.map((item: any) => item.schema_name)

            if (!schemas?.length) return


            let collections: any = Array.from(new Set(dataIndex.map((item: any) => item.collection)))

            await this.actionDropCollections(schemas)
            await this.actionIndexDataCollection(collections, mode)


        } catch (error) {
            this.log.debug("[-] Error actionIndexAllData")
            this.log.debug(error)
        }
    }

    async getDataCollection(collection: string, query: any) {
        try {

            let schema = await this.getSchema()
            let itemService = new this.services.ItemsService(collection, {
                schema,
                knex: this.database
            })

            return itemService.readByQuery(query)


        } catch (error) {
            this.log.error(`[!] Error getDataCollection: ${collection} -> ${JSON.stringify(query)}`)
            this.log.debug(error)
        }
    }

    async actionIndexDataCollection(collections?: string[], mode?: "trigger_event" | "run_cronjob") {
        try {
            let dataIndex = await this.getSchemaIndex(mode)

            if (collections) {
                dataIndex = dataIndex.filter((item: any) => collections?.includes(item.collection))
            }

            await this.initCollectionSchema({ collections, mode })

            // console.log({
            //     collections,
            //     dataIndex: this.dataIndex
            // })

            return this.actionIndexing(dataIndex)

        } catch (error) {
            this.log.error("[!] Error actionIndexData")
            console.log(error)
        }

    }


    async actionIndexDataSchema(schemas?: string[]) {
        try {

            // this.logger.debug({ schemas })

            let dataIndex = await this.getSchemaIndex()


            if (schemas) {
                dataIndex = dataIndex.filter((item: any) => schemas?.includes(item.schema_name))
            }

            await this.initCollectionSchema(schemas)

            // console.log({
            //     collections,
            //     dataIndex: this.dataIndex
            // })

            return this.actionIndexing(dataIndex)

        } catch (error) {
            this.log.error("[!] Error actionIndexData")
            console.log(error)
        }
    }



    async actionIndexing(dataIndex: Array<any>) {
        // this.logger.debug({ dataIndex })

        let schemaService = new this.services.ItemsService(COLLECTION_TYPESENSE_SCHEMA, {
            schema: await this.getSchema()
        })

        for (let item of dataIndex) {
            try {
                let { id, collection, query, function_parse, schema, schema_name } = item
                let data = await this.getDataCollection(collection, query)

                // this.logger.debug({ data })
                if (!data?.length) continue

                // this.logger.debug({ function_parse, data })

                let dataParse: any = await execCode(this.context, function_parse, data).catch((e: any) => {
                    this.log.error(e)
                    return []
                })

                // this.log.debug( { dataParse })

                if (!dataParse?.length) continue

                await schemaService.updateOne(id, {
                    data_indexed: dataParse
                }, {
                    autoPurgeCache: true,
                    emitEvents: false
                })

                this.log.debug(`[!] Indexing data collection: ${schema_name} (${dataParse.length} items)`)

                let dataIndexed: any = await this.client.collections(schema_name).documents().import(dataParse, { action: 'upsert' })

                let dataSuccess = dataIndexed.filter((ite: any) => ite.success === true).length
                let dataFailure = dataParse.length - dataSuccess

                this.log.debug(`[!] Success/Failure: ${dataSuccess}/${dataFailure} `)

                this.log.debug(`[-->] Indexed data collection: ${schema_name}`)
            } catch (error: any) {
                this.log.error(`Error index schema "${item.schema_name}"`)
                this.log.debug(error)
                await schemaService.updateOne(item.id, {
                    data_indexed: error?.message,
                }, {
                    autoPurgeCache: true,
                    emitEvents: false
                })
            }

        }
    }

    async actionMultiSearch(searchRequests: MultiSearchRequestsSchema, commonSearchParams?: Partial<MultiSearchRequestSchema>) {


        try {
            let data = await this.searchClient.multiSearch.perform(searchRequests, commonSearchParams)
            return { data }
        } catch (error: any) {
            this.log.error("Error actionMultiSearch")
            console.log(error)
            return {
                errors: [new ServiceUnavailableError({
                    service: EXTENSION_NAME + "(Multi-search)",
                    reason: error?.message
                })]
            }

        }
    }


    async actionSearchCollection(collection: string, searchParameters: SearchParams) {
        try {
            //@ts-ignore
            let data = await this.searchClient.collections(collection).documents().search(searchParameters)
            return { data }
        } catch (error: any) {
            this.log.error("Error actionSearchCollection")
            console.log(error)
            return {
                errors: [new ServiceUnavailableError({
                    service: EXTENSION_NAME + "(Search collection)",
                    reason: JSON.stringify(error?.message)
                })]
            }
        }
    }

    async actionDropCollections(schema: string[]) {
        if (schema?.length > 0) {
            await this.searchClient.clearCache()

            for (let item of schema) {
                try {
                    await this.client.collections(item).delete()
                    this.log.debug(`[!] Drop schema "${item}" success !`)
                } catch (error: any) {
                    this.log.error("Error actionDropCollections")
                    this.logger.error(error?.message)
                }
            }
        }
    }
}