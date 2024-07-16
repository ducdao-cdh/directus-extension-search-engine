import { BaseService } from "../services/base.service"
import { TypeContextConstructor } from "../types/base.type"

export class ScheduleEventClass extends BaseService {
    public action: any

    constructor(schedule: any, context: TypeContextConstructor) {
        super({ context })
        this.schedule = schedule


        // this.schedule("*/5 * * * *", async () => this.scheduleCheckVM())
        // this.schedule("*/10 * * * *", async () => this.botService.scheduleCheckStatusBotPush())
    }



}