import { COLLECTION_TYPESENSE_SCHEMA, EXTENSION_NAME } from "../data"
import { BaseService } from "../services/base.service"
import { TypeContextConstructor } from "../types/base.type"

export class ScheduleEventClass extends BaseService {
    public action: any

    public time = this.env['TYPESENSE_CRONJOB_TIME'] || "*/30 * * * *"

    constructor(schedule: any, context: TypeContextConstructor) {
        super({ context })
        this.schedule = schedule

        this.schedule(this.time, async () => this.runCronJobIndexData())
    }


    async runCronJobIndexData() {
        let { typesense_type_index } = await this.loadConfigs({
            fields: ['typesense_type_index']
        })


        if (typesense_type_index !== "run_cronjob" || this.env['TYPESENSE_CRONJOB_STATUS'] === 'running') return

        this.env['TYPESENSE_CRONJOB_STATUS'] = 'running'

        let schema = await this.database(COLLECTION_TYPESENSE_SCHEMA)
            .select('collection')
            .where('status', this.STATUS_PUBLISH)
            .distinct("collection")

        if (!schema.length) return

        //this.logger.debug({ collection, schema })

        let collections = Array.from(new Set(schema.map((item: any) => item.collection)))

        return this.emitter.emitFilter('TYPESENSE_INDEX_DATA_COLLECTION', { collections }).then(() => {

            this.env['TYPESENSE_CRONJOB_STATUS'] = 'pending'

        }).catch((e: any) => {

            this.logger.error({ name: EXTENSION_NAME }, e?.message)
            this.logger.debug(e)

            this.env['TYPESENSE_CRONJOB_STATUS'] = 'pending'
        })


    }



}