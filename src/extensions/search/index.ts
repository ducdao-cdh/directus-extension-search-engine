import { defineEndpoint } from '@directus/extensions-sdk'
import { SearchControllerClass } from '../../controllers/search.controller'

export default defineEndpoint((router, context) => {

	new SearchControllerClass(router, context)

})
