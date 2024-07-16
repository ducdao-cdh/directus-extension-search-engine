import { Client, SearchClient } from "typesense"
import { escapeHtml, execCode } from "../utils"
import { BaseService } from "./base.service"
import { EXTENSION_NAME } from "../data"
import { SearchParams } from "typesense/lib/Typesense/Documents"

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
                this.logger.debug({ name: EXTENSION_NAME }, "[!] Initial schema existed")
            }

        } catch (error) {
            this.logger.debug({ name: EXTENSION_NAME }, "[-] Error initCollections")
            this.logger.debug({ name: EXTENSION_NAME }, error)
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
            this.logger.debug({ name: EXTENSION_NAME }, "[-] Error actionIndexAllData")
            this.logger.debug({ name: EXTENSION_NAME }, error)
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
            this.logger.error({ name: EXTENSION_NAME }, `[!] Error getDataCollection: ${collection} -> ${JSON.stringify(query)}`)
            this.logger.debug({ name: EXTENSION_NAME }, error)
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
                    this.logger.error({ name: EXTENSION_NAME }, e)
                    return []
                })

                // this.logger.debug({ name: EXTENSION_NAME }, { dataParse })


                if (!dataParse?.length) continue

                this.logger.debug({ name: EXTENSION_NAME }, `[+] Indexing data collection: ${schema.name} (${dataParse.length})`)

                let index = 0
                for (let record of dataParse) {
                    await this.client.collections(schema.name).documents().upsert(record)
                    this.logger.debug({ name: EXTENSION_NAME }, `[-] Indexed -> ${++index}/${dataParse.length}`)
                }

                this.logger.debug({ name: EXTENSION_NAME }, `[-->] Indexed data collection: ${schema.name}`)

            }

        } catch (error) {
            this.logger.error({ name: EXTENSION_NAME }, "[!] Error actionIndexData")
            console.log(error)
        }

    }

    async actionMultiSearch(searchRequests: any, commonSearchParams?: any) {
        let data = await this.searchClient.multiSearch.perform(searchRequests, commonSearchParams)
        return data
    }


    async actionSearchCollection(collection: string, searchParameters: SearchParams) {
        //@ts-ignore
        return this.searchClient.collections(collection).documents().search(searchParameters)
    }

    async actionDropCollections(collections: string[]) {
        if (collections.length > 0) {
            await this.searchClient.clearCache()

            for (let collection of collections) {
                try {
                    await this.client.collections(collection).delete()
                } catch (error: any) {
                    this.logger.error(error.message)
                }
            }
        }
    }









}