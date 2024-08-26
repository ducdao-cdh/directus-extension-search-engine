import { COLLECTION_TYPESENSE_SCHEMA } from "../data"
import { BaseService } from "../services/base.service"
import { TypeContextConstructor } from "../types/base.type"

export class FilterEventClass extends BaseService {

    constructor(filter: any, context: TypeContextConstructor) {
        super({ context })
        this.filter = filter


        this.filter(COLLECTION_TYPESENSE_SCHEMA + ".items.update", async (payload: any, meta: any, context: any) => {
            if (payload.schema_name) {
                let items = await this.database(COLLECTION_TYPESENSE_SCHEMA).select('schema_name').whereIn('id', meta.keys)

                if (!items?.length) return

                await this.emitter.emitFilter('TYPESENSE_CLEAR_SCHEMA', { schema: items.map((item: any) => item.schema_name) })

                return payload
            }
        })


        this.filter(COLLECTION_TYPESENSE_SCHEMA + ".items.delete", async (payload: any, meta: any, context: any) => {

            let items = await this.database(COLLECTION_TYPESENSE_SCHEMA).select('schema_name').whereIn('id', meta.keys)
            if (!items?.length) return
            this.emitter.emitAction('TYPESENSE_CLEAR_SCHEMA', { schema: items.map((item: any) => item.schema_name) })

            return payload

        })

    }
}