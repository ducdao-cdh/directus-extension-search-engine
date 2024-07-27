import { Client, SearchClient } from "typesense"
import { escapeHtml, execCode } from "../utils"
import { BaseService } from "./base.service"
import { EXTENSION_NAME } from "../data"
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
        //     // TYPESENCE_INDEXING: this.env['TYPESENCE_INDEXING']
        // })

        this.client = new Client({
            nodes: this.env['TYPESENSE_API_URLS'],
            apiKey: this.env.TYPESENSE_API_KEY
        })

        this.searchClient = new SearchClient({
            nodes: this.env['TYPESENSE_API_URLS'],
            apiKey: this.env.TYPESENSE_API_KEY
        })

        this.dataIndex = this.env.TYPESENCE_INDEXING

    }

    async initCollectionSchema() {
        try {
            let collections = await this.client.collections().retrieve()
            // this.logger.debug({ collections })

            let schemas = this.dataIndex.filter((item: any) => !collections.some((ite: any) => ite.name === item.schema.name))

            if (schemas.length > 0) {
                return Promise.all(schemas.map(async (item: any) => this.client.collections().create(item.schema)))
            } else {
                this.log.debug("[!] Initial schema existed")
            }

        } catch (error) {
            this.log.debug("[-] Error initCollections")
            this.log.debug(error)
        }
    }


    async actionRefreshIndexData() {
        try {
            let schemas = this.dataIndex.map((item: any) => item.schema?.name)

            if (!schemas?.length) return


            let collections: any = Array.from(new Set(this.dataIndex.map((item: any) => item.collection)))

            await this.actionDropCollections(schemas)
            await this.actionIndexData(collections)


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

    async actionIndexData(collections?: string[]) {
        try {
            if (collections) {
                this.dataIndex = this.dataIndex.filter((item: any) => collections?.includes(item.collection))
            }

            await this.initCollectionSchema()

            // console.log({
            //     collections,
            //     dataIndex: this.dataIndex
            // })


            for (let item of this.dataIndex) {
                let { collection, query, function_parse, schema } = item
                let data = await this.getDataCollection(collection, query)

                if (!data?.length) continue

                // this.logger.debug({ function_parse, data })

                let dataParse: any = await execCode(this.context, function_parse, data).catch((e: any) => {
                    this.log.error(e)
                    return []
                })

                // this.log.debug( { dataParse })


                if (!dataParse?.length) continue

                this.log.debug(`[+] Indexing data collection: ${schema.name} (${dataParse.length})`)

                let index = 0
                for (let record of dataParse) {
                    await this.client.collections(schema.name).documents().upsert(record)
                    this.log.debug(`[-] Indexed -> ${++index}/${dataParse.length}`)
                }

                this.log.debug(`[-->] Indexed data collection: ${schema.name}`)
            }

        } catch (error) {
            this.log.error("[!] Error actionIndexData")
            console.log(error)
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

    async actionDropCollections(collections: string[]) {
        if (collections.length > 0) {
            await this.searchClient.clearCache()

            for (let collection of collections) {
                try {
                    await this.client.collections(collection).delete()
                } catch (error: any) {
                    this.log.error("Error actionDropCollections")
                    this.logger.error(error?.message)
                }
            }
        }
    }









}