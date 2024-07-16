import KeyvRedis from "@keyv/redis"
import { TypeContextConstructor } from "../types/base.type"
import { BaseService } from "./base.service"
import Keyv from "keyv"


export class RedisService extends BaseService {

    public keyv
    private timeout: Array<number> = [13, 15, 17, 20, 23, 25]

    constructor(context: TypeContextConstructor) {
        super({ context })
        this.keyv = new Keyv({ store: new KeyvRedis(this.env['REDIS']) })

        this.keyv.on("error", (error) => this.logger.error({ name: "RedisService", error }))
        this.keyv.on("reconnecting", () => this.logger.info({ name: "RedisService", message: "[!] Reconnecting to Redis ..." }))
        this.keyv.on("ready", () => this.logger.info({ name: "RedisService", message: "[!] Redis is ready !" }))
    }

    timeExpire() {
        let time = this.timeout[Math.floor(Math.random() * this.timeout.length)] || 30
        return time * 60 * 1000
    }


    async setKey(key: string, value: any, timeEx?: number) {
        if (typeof value === "object") {
            value = JSON.stringify(value)
        }

        this.keyv.set(key, value, timeEx ?? undefined)
    }
}