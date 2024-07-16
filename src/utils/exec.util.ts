import { EXTENSION_NAME } from "../data"
import { TypeContextConstructor } from "../types/base.type"

import { createRequire } from 'node:module'

const require = createRequire(__filename)
const ivm = require('isolated-vm')

export const execCode = async (ctx: TypeContextConstructor, code: any, data: any = []) => {

    let { logger } = ctx

    // console.log({ code, data })

    function unpackArgs(args: any[]) {
        return args.length === 1 ? args[0] : args
    }

    const isolateSizeMb = 30
    const scriptTimeoutMs = 30000

    const isolate = new ivm.Isolate({ memoryLimit: isolateSizeMb })
    const context = isolate.createContextSync()
    const jail = context.global
    jail.setSync('global', jail.derefInto())
    jail.setSync('process', { env: {} }, { copy: true })
    jail.setSync('module', { exports: null }, { copy: true })


    jail.setSync(
        'console',
        {
            log: new ivm.Callback((...args: any[]) => logger.info(unpackArgs(args)), { sync: true }),
            info: new ivm.Callback((...args: any[]) => logger.info(unpackArgs(args)), { sync: true }),
            warn: new ivm.Callback((...args: any[]) => logger.warn(unpackArgs(args)), { sync: true }),
            error: new ivm.Callback((...args: any[]) => logger.error(unpackArgs(args)), { sync: true }),
            trace: new ivm.Callback((...args: any[]) => logger.trace(unpackArgs(args)), { sync: true }),
            debug: new ivm.Callback((...args: any[]) => logger.debug(unpackArgs(args)), { sync: true }),
        },
        { copy: true },
    )


    // logger.debug(code)

    // code = `module.exports = function(data) { return data }`


    // Run the operation once to define the module.exports function
    await context.eval(code, { timeout: scriptTimeoutMs })

    const inputData = new ivm.ExternalCopy({ data })


    const resultRef = await context.evalClosure(`return module.exports($0.data)`, [inputData.copyInto()], {
        result: { reference: true, promise: true },
        timeout: scriptTimeoutMs,
    })

    const result = await resultRef.copy()

    // Memory cleanup
    resultRef.release()
    inputData.release()
    context.release()
    isolate.dispose()

    // logger.debug({ name: EXTENSION_NAME }, { result })

    return result

}