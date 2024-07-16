import { SearchParams } from "typesense/lib/Typesense/Documents"
import { BaseService } from "../services/base.service"
import { TypesenseClass } from "../services/typesense.service"
import { TypeContextConstructor } from "../types/base.type"


export class EmitterEventClass extends BaseService {

    constructor(context: TypeContextConstructor) {
        super({ context })
        this.emitter = context.emitter


        this.emitter.onAction("TYPESENCE_INDEX_DATA", async (payload: { collections: Array<string> }) => {
            let typesenseClass = new TypesenseClass(context)
            return typesenseClass.actionIndexData(payload.collections)
        })

        this.emitter.onAction("TYPESENCE_CLEAR_COLLECTIONS", async (payload: { collections: Array<string> }) => {
            let typesenseClass = new TypesenseClass(context)
            return typesenseClass.actionDropCollections(payload.collections)
        })

        this.emitter.onFilter("TYPESENCE_MULTI_SEARCH", async (payload: { searchRequests: any, commonSearchParams: any }) => {
            let typesenseClass = new TypesenseClass(context)
            return typesenseClass.actionMultiSearch(payload.searchRequests, payload.commonSearchParams)
        })

        this.emitter.onFilter("TYPESENCE_SEARCH_COLLECTION", async (payload: { collection: string, searchParameters: SearchParams }) => {
            let typesenseClass = new TypesenseClass(context)
            return typesenseClass.actionSearchCollection(payload.collection, payload.searchParameters)
        })

        this.emitter.onAction("TYPESENCE_REFRESH_INDEX", async () => {
            let typesenseClass = new TypesenseClass(context)
            return typesenseClass.actionRefreshIndexData()
        })
    }

}