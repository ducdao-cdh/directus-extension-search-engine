import { defineHook } from '@directus/extensions-sdk'
import { EmitterEventClass } from '../../events/emitter.event'
import { ScheduleEventClass } from '../../events/schedule.event'
import { ActionEventClass } from '../../events/action.event'
import { FilterEventClass } from '../../events/filter.event'

export default defineHook(({ action, schedule, filter }, context) => {

    new EmitterEventClass(context)
    new ScheduleEventClass(schedule, context)
    new ActionEventClass(action, context)
    new FilterEventClass(filter, context)


})
