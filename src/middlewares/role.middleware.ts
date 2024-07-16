import { createError } from '@directus/errors'
//@ts-ignore
import _ from 'lodash-es'

export function accessMiddleware(roles: Array<string> = ["user"], context: any) {
    const cases: any = {
        user: (req: any, _res: any) => {
            return _.has(req, 'accountability.user')
        },
        admin: (req: any, _res: any) => {
            return _.get(req, 'accountability.admin') === true
        }
    }


    return (req: any, res: any, next: any) => {

        const checkStatus = []
        for (const role of roles) {
            if (cases[role]) {
                checkStatus.push(cases[role](req, res))
            }
        }

        if (checkStatus?.every(item => item === false)) {
            let InvalidCredentials = createError('INVALID_CREDENTIALS', `You are not "${roles.join(" ,").toUpperCase()}"`, 401)
            throw new InvalidCredentials()
        }

        return next()
    }
}