export interface TypeEventsConstructor {
    init?: any
    filter?: any
    action?: any
    schedule?: any
}

export interface TypeContextConstructor {
    database?: any
    services?: any
    getSchema?: any
    logger?: any
    env?: any
    emitter?: any
}