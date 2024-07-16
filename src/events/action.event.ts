import { BaseService } from "../services/base.service"
import { TypesenseClass } from "../services/typesense.service"
import { TypeContextConstructor } from "../types/base.type"


export class ActionEventClass extends BaseService {

    constructor(action: any, context: TypeContextConstructor) {
        super({ context })
        this.action = action

        this.action('items.create', async (meta: any) => triggerIndex(meta))
        this.action('items.update', async (meta: any) => triggerIndex(meta))
        this.action('items.delete', async (meta: any) => triggerIndex(meta))

        const triggerIndex = async (meta: any) => {
            let { collection } = meta

            let typesEngine = context.env['SEARCH_ENGINE_TYPES']

            for (let type of typesEngine) {
                switch (type) {
                    case "typesence":
                        let dataIndex = JSON.parse(context.env['TYPESENCE_INDEXING'])
                        if (!dataIndex.some((item: any) => item.collection === collection)) return
                        let typesenceService = new TypesenseClass(context)
                        await typesenceService.actionIndexData([collection])
                        break
                    default:
                        break
                }
            }


        }

    }

}