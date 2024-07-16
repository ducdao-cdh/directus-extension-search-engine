import { InvalidPayloadError } from "@directus/errors"
import { accessMiddleware } from "../middlewares/role.middleware"
import { BaseService } from "../services/base.service"
import { TypeContextConstructor } from "../types/base.type"
import { asyncHandler } from "../utils"
import { typeMiddleware } from "../middlewares/type.middleware"


export class SearchControllerClass extends BaseService {

    protected router: any

    constructor(router: any, context: TypeContextConstructor) {
        super({ context })
        this.router = router

        this.router.post("/typesence/search-collection/:collection",
            typeMiddleware(context),
            accessMiddleware(['user'], context),
            asyncHandler(async (req: any, res: any, next: any) => {

                let { collection } = req.params
                let searchParameters = req.body

                let data = await this.emitter.emitFilter("TYPESENCE_SEARCH_COLLECTION", { collection, searchParameters })
                return res.status(201).json(data)
            }))

        this.router.post("/typesence/multi-search",
            typeMiddleware(context),
            accessMiddleware(['user'], context),
            asyncHandler(async (req: any, res: any, next: any) => {

                let commonSearchParams = req.query
                let searchRequests = req.body

                let data = await this.emitter.emitFilter("TYPESENCE_MULTI_SEARCH", { searchRequests, commonSearchParams })
                return res.status(201).json(data)
            }))

        this.router.post("/typesence/refresh-index",
            typeMiddleware(context),
            accessMiddleware(['admin'], context),
            asyncHandler(async (req: any, res: any, next: any) => {

                this.emitter.emitAction("TYPESENCE_REFRESH_INDEX")

                return res.status(201).json({
                    data: {
                        status: "success",
                        type: "TYPESENCE_REFRESH_INDEX"
                    }
                })
            }))

        this.router.post("/typesence/index-data",
            typeMiddleware(context),
            accessMiddleware(['admin'], context),
            asyncHandler(async (req: any, res: any, next: any) => {

                let { collections } = req.body

                this.emitter.emitAction("TYPESENCE_INDEX_DATA", { collections })

                return res.status(201).json({
                    data: {
                        status: "success",
                        type: "TYPESENCE_INDEX_DATA"
                    }
                })
            }))


        this.router.post("/typesence/clear-collections",
            typeMiddleware(context),
            accessMiddleware(['admin'], context),
            asyncHandler(async (req: any, res: any, next: any) => {

                let { collections } = req.body

                this.emitter.emitAction("TYPESENCE_CLEAR_COLLECTIONS", { collections })

                return res.status(201).json({
                    data: {
                        status: "success",
                        type: "TYPESENCE_CLEAR_COLLECTIONS"
                    }
                })
            }))


        this.router.post("/elasticsearch",
            typeMiddleware(context),
            accessMiddleware(['user'], context),
            asyncHandler(async (req: any, res: any, next: any) => {

                return res.status(200).json({ data: 111 })
            }))
    }
}
