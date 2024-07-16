import { ServiceUnavailableError } from '@directus/errors'
import { COLLECTION_CONFIG, EXTENSION_NAME } from '../data'

export function typeMiddleware(context: any) {

    let { services } = context


    return async (req: any, res: any, next: any) => {
        let routePath = req.route.path

        let configService = new services.ItemsService(COLLECTION_CONFIG, { schema: req.schema })

        let { engine_types } = await configService.readSingleton({
            fields: [
                "engine_types"
            ]
        })


        let array = routePath?.split("/")?.filter((path: string) => path)

        if (!engine_types.includes(array[0])) {
            return next(new ServiceUnavailableError({
                service: EXTENSION_NAME,
                reason: "Config engine type is not allowed"
            }))
        }

        return next()
    }
}