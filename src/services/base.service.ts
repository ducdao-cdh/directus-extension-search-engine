import { TypeContextConstructor, TypeEventsConstructor } from "../types/base.type"
import { COLLECTION_CONFIG } from '../data'
import { titleCase } from "title-case"

export class BaseService {
    public events: any
    public context: any
    public redis: any

    public emitter: any
    public action: any
    public filter: any
    public schedule: any
    public init: any

    public database: any
    public logger: any
    public services: any
    public getSchema: any
    public env: any

    public STATUS_PUBLISH = "published"
    private COLLECTION_CONFIG = COLLECTION_CONFIG

    constructor(params: { events?: TypeEventsConstructor, context: TypeContextConstructor, redis?: any }) {
        this.events = params?.events
        this.context = params?.context
        this.redis = params?.redis

        this.database = this.context?.database
        this.services = this.context?.services
        this.getSchema = this.context?.getSchema
        this.logger = this.context?.logger
        this.env = this.context?.env
        this.emitter = this.context?.emitter

        this.filter = this.events?.filter
        this.action = this.events?.action
        this.schedule = this.events?.schedule
        this.init = this.events?.init

    }


    async loadConfigs(query: any = {}) {
        let schema = await this.getSchema()
        let configService = new this.services.ItemsService(this.COLLECTION_CONFIG, { schema })
        return configService.readSingleton(query, { emitEvents: false })
    }

    async upsertConfigs(data: any) {
        let schema = await this.getSchema()
        let configService = new this.services.ItemsService(this.COLLECTION_CONFIG, { schema })
        return configService.upsertSingleton(data, { emitEvents: false })
    }


    async injectOptions() {
        let types = this.env['SEARCH_ENGINE_TYPES']

        types = typeof types === 'string' ? [types] : types

        if (!types?.length) return

        types = types.map((item: string) => ({
            text: titleCase(item),
            value: item
        }))

        let fieldService = new this.services.FieldsService({ schema: await this.getSchema() })

        await fieldService.updateField(COLLECTION_CONFIG, {
            field: "engine_types",
            meta: {
                options: {
                    choices: types
                },
                display: "labels",
                display_options: {
                    choices: types
                }
            }
        })

    }

}