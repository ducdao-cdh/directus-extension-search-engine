import { COLLECTION_CONFIG, EXTENSION_NAME } from "../../data"
import { BaseService } from "../../services/base.service"
import { collections, relations } from "./utils"

export const initialCollections = async (context: any) => {
    const { services, logger } = context
    const name = EXTENSION_NAME

    const collectionService = new services.CollectionsService({
        schema: await context.getSchema()
    })

    logger.info({ name }, '[!] Checking collections ...')

    const collectionsData = await context.database('directus_collections')
        .select('collection')
        .whereIn('collection', collections.map((item: any) => item.collection))

    let collectionsCreate = collections.filter((item: any) => !collectionsData.some((ite: any) => ite.collection === item.collection))

    if (collectionsCreate.length === 0) {
        logger.info({ name }, `[!] Collections are exist: ${collections.map((item: any) => item.collection).join(" , ")}`)
    } else {
        for (let collection of collectionsCreate) {
            let { fields, ...keys } = collection

            let primaryField = fields?.find(item => item.schema?.is_primary_key === true)

            await collectionService.createOne({
                ...keys,
                fields: [primaryField]
            })
            logger.debug({ name }, `[+] Created collection: ${keys.collection}`)
        }
    }

    const fieldsData = await context.database('directus_fields')
        .select('collection', 'field')
        .whereIn('collection', collections.map((item: any) => item.collection))

    const fields = collections.reduce((pre: any, current: any) => {
        return [
            ...pre,
            ...(current?.fields ?? [])
        ]
    }, [])

    logger.info({ name }, '[!] Checking fields ...')

    let fieldsCreated = fields.filter((item: any) => !fieldsData.some((ite: any) => ite.collection === item.collection && ite.field === item.field))

    if (fieldsCreated.length === 0) {
        logger.info({ name }, `[!] Fields are exist`)
    } else {

        let fieldService = new services.FieldsService({
            schema: await context.getSchema()
        })

        let fieldsAlias = fieldsCreated?.filter((item: any) => item?.meta?.special?.some((ite: any) => ite === 'm2o' || ite === 'o2m' || ite === 'm2m')) || []
        fieldsCreated = fieldsCreated?.filter((item: any) => !fieldsAlias?.some((ite: any) => ite.field === item.field)) || []

        for (let field of fieldsCreated) {
            let { collection, ...keys } = field
            await fieldService.createField(collection, keys)
            logger.debug({ name }, `[+] Created field "${keys.field}" collection "${collection}"`)
        }

        if (fieldsAlias.length > 0) {
            fieldsAlias = fieldsAlias.sort((a, b) => {
                if (a.meta?.special?.some((ite: any) => ite === 'm2o') && !b.meta?.special?.some((ite: any) => ite === 'm2o')) {
                    return -1
                }
                if (!a.meta?.special?.some((ite: any) => ite === 'm2o') && b.meta?.special?.some((ite: any) => ite === 'm2o')) {
                    return 1
                }
                return 0
            })

            let fieldService = new services.FieldsService({
                schema: await context.getSchema()
            })

            for (let field of fieldsAlias) {
                let { collection, ...keys } = field
                await fieldService.createField(collection, keys)

                logger.debug({ name }, `[+] Created field alias "${keys.field}" collection "${collection}"`)
            }
        }
    }


    logger.debug({ name }, '[!] Checking relations ...')

    const relationsData = await context.database('directus_relations')
        .select('many_collection', 'one_collection')
        .whereIn('many_collection', collections.map((item: any) => item.collection))
        .orWhereIn('one_collection', collections.map((item: any) => item.collection))

    const relationsCreated = relations.filter((item: any) => !relationsData.some((ite: any) => ite.many_collection === item.collection || ite.one_collection === item.collection))

    if (relationsCreated.length === 0) {
        logger.info({ name }, `[!] Relations are exist`)
    } else {
        let schema = await context.getSchema()
        const relationService = new services.RelationsService({
            schema
        })

        for (let relation of relationsCreated) {
            await relationService.createOne(relation)

            logger.debug({ name }, `[!] Created relation "${relation.field}": "${relation.collection}" -> "${relation.related_collection}"`)
        }
    }

    logger.info({ name }, `[!] Initial schema success !`)
}

export const loadEnvironments = async (context: any) => {
    let { logger, env } = context



    let baseClass = new BaseService({ context })

    let { engine_types, typesense_urls } = await baseClass.loadConfigs({
        fields: [
            'engine_types',
            'typesense_urls'
        ]
    })

    // logger.debug({ engine_types, typesense_api_key, typesense_urls, typesense_indexing })
    env['SEARCH_ENGINE_TYPES'] = engine_types
    env['TYPESENSE_API_URLS'] = typesense_urls


    // console.log({
    //     env: env.TYPESENSE_API_URLS,
    //     typesense_urls,
    //     test: env['TYPESENSE_API_URLS']
    //     // TYPESENSE_API_URLS: env['TYPESENSE_API_URLS'],
    //     // TYPESENSE_INDEXING: env['TYPESENSE_INDEXING'],
    // })
    // await baseClass.injectOptions()
    logger.debug({ name: EXTENSION_NAME }, "[+] Load configs success !")
} 