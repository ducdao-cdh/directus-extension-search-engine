import { SearchParams } from "typesense/lib/Typesense/Documents"
import { BaseService } from "../services/base.service"
import { TypesenseClass } from "../services/typesense.service"
import { TypeContextConstructor } from "../types/base.type"


export class EmitterEventClass extends BaseService {

    constructor(context: TypeContextConstructor) {
        super({ context })
        this.emitter = context.emitter


        this.emitter.onAction("TYPESENSE_INDEX_DATA_SCHEMA", async (payload: { schema: Array<string> }) => {
            let typesenseClass = new TypesenseClass(context)
            return typesenseClass.actionIndexDataSchema(payload.schema)
        })

        this.emitter.onAction("TYPESENSE_INDEX_DATA_COLLECTION", async (payload: { collections: Array<string> }) => {
            let typesenseClass = new TypesenseClass(context)
            return typesenseClass.actionIndexDataCollection(payload.collections)
        })

        this.emitter.onAction("TYPESENSE_CLEAR_SCHEMA", async (payload: { schema: Array<string> }) => {
            let typesenseClass = new TypesenseClass(context)
            return typesenseClass.actionDropCollections(payload.schema)
        })

        this.emitter.onFilter("TYPESENSE_CLEAR_SCHEMA", async (payload: { schema: Array<string> }) => {
            let typesenseClass = new TypesenseClass(context)
            return typesenseClass.actionDropCollections(payload.schema)
        })


        this.emitter.onFilter("TYPESENSE_MULTI_SEARCH", async (payload: { searchRequests: any, commonSearchParams: any }) => {
            let typesenseClass = new TypesenseClass(context)
            return typesenseClass.actionMultiSearch(payload.searchRequests, payload.commonSearchParams)
        })

        this.emitter.onFilter("TYPESENSE_SEARCH_COLLECTION", async (payload: { collection: string, searchParameters: SearchParams }) => {
            let typesenseClass = new TypesenseClass(context)
            return typesenseClass.actionSearchCollection(payload.collection, payload.searchParameters)
        })

        this.emitter.onAction("TYPESENSE_REFRESH_INDEX", async () => {
            let typesenseClass = new TypesenseClass(context)
            return typesenseClass.actionRefreshIndexData()
        })
    }

}