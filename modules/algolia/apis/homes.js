import { getHeaders } from '../helpers'
import fetch from 'node-fetch'
import { unWrap, getErrorResponse } from '../../../utils/fetch'

export default (algoliaConfig) => {
    const headers = getHeaders(algoliaConfig)

    return {
        create: async (homeId, payload) => {
            try {
                return unWrap(await fetch(`https://${algoliaConfig.appId}.algolia.net/1/indexes/homes/${homeId}`, {
                    headers,
                    method: 'PUT',
                    body: JSON.stringify(payload)
                }))
            } catch (error) {
                console.error(error)
                return getErrorResponse(error)
            }
        },
    }
}
