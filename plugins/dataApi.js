export default function (context, inject) {
    const appId = 'EPZ034JVX7';
    const apiKey = '8ed129544e1d7cdd472c9f40ac2121ba';
    const headers = {
        'X-Algolia-API-Key': apiKey,
        'X-Algolia-Application-Id': appId,
    }

    inject('dataApi', {
        getHome
    })

    async function getHome(homeId) {
        try {
            return unWrap(await fetch(`https://${appId}.algolia.net/1/indexes/homes/${homeId}`, { headers }))
        } catch (error) {
            return getErrorResponse(error)
        }
    }

    async function unWrap(response) {
        const json = await response.json()
        const { ok, status, statusText } = response
        return {
            json,
            ok,
            status,
            statusText,
        }
    }

    function getErrorResponse(error) {
        return {
            ok: false,
            status: 500,
            statusText: error.message,
            json: {}
        }
    }
}
