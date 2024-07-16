import { defineHook } from '@directus/extensions-sdk'
import { EmitterEventClass } from '../../events/emitter.event'
import { ScheduleEventClass } from '../../events/schedule.event'
import { ActionEventClass } from '../../events/action.event'

export default defineHook(({ action, schedule }, context) => {

    new EmitterEventClass(context)
    new ScheduleEventClass(schedule, context)
    new ActionEventClass(action, context)


})
