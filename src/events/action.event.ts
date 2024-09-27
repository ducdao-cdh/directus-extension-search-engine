import { COLLECTION_TYPESENSE_SCHEMA } from "../data"
import { BaseService } from "../services/base.service"
import { TypeContextConstructor } from "../types/base.type"


export class ActionEventClass extends BaseService {

    constructor(action: any, context: TypeContextConstructor) {
        super({ context })
        this.action = action

        this.action(COLLECTION_TYPESENSE_SCHEMA + '.items.create', async (meta: any) => this.actionCreateItem(meta))
        this.action(COLLECTION_TYPESENSE_SCHEMA + '.items.update', async (meta: any) => this.actionUpdateItems(meta))

        this.action('items.create', async (meta: any) => this.triggerIndexItems(meta))
        this.action('items.update', async (meta: any) => this.triggerIndexItems(meta))
        this.action('items.delete', async (meta: any) => this.triggerIndexItems(meta))

        this.action('users.create', async (meta: any) => this.triggerIndexItems(meta))
        this.action('users.update', async (meta: any) => this.triggerIndexItems(meta))
        this.action('users.delete', async (meta: any) => this.triggerIndexItems(meta))

    }


    async actionCreateItem(meta: any) {
        let { payload } = meta

        if (payload.status !== "published") return

        return this.emitter.emitAction('TYPESENSE_INDEX_DATA_SCHEMA', { schema: [payload.schema_name] })
    }

    async actionUpdateItems(meta: any) {
        let { payload } = meta

        let items = await this.database(COLLECTION_TYPESENSE_SCHEMA).select('schema_name').whereIn('id', meta.keys)

        if (!items?.length) return

        if (payload.status === "draft" || payload.status === "archived") {
            return this.emitter.emitAction('TYPESENSE_CLEAR_SCHEMA', { schema: items.map((item: any) => item.schema_name) })
        }

        return this.emitter.emitAction('TYPESENSE_INDEX_DATA_SCHEMA', { schema: items.map((item: any) => item.schema_name) })
    }


    async triggerIndexItems(meta: any) {
        let { collection } = meta
        // this.logger.debug({
        //     collection
        // })

        let { engine_types } = await this.loadConfigs({
            fields: ['engine_types']
        })

        engine_types = JSON.parse(JSON.stringify(engine_types))

        if (!engine_types.includes('typesense')) return

        let schema = await this.database(COLLECTION_TYPESENSE_SCHEMA)
            .select('collection')
            .where('status', this.STATUS_PUBLISH)
            .where('mode', 'trigger_event')
            .where('collection', collection)

        if (!schema.length) return

        //this.logger.debug({ collection, schema })

        let collections = Array.from(new Set(schema.map((item: any) => item.collection)))

        return this.emitter.emitAction('TYPESENSE_INDEX_DATA_COLLECTION', { collections })
    }

}