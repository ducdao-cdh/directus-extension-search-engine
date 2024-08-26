import { defineHook } from '@directus/extensions-sdk'
import { initialCollections, loadEnvironments } from './init.service'
import { COLLECTION_CONFIG } from '../../data'

export default defineHook(({ init, action }, context) => {

	init("app.after", async () => {
		await initialCollections(context)
		await loadEnvironments(context)
	})

	action(COLLECTION_CONFIG + '.items.update', async () => loadEnvironments(context))
	action(COLLECTION_CONFIG + '.items.create', async () => loadEnvironments(context))
})