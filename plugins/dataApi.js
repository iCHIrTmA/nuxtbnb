export default function (context, inject) {
    const appId = 'EPZ034JVX7';
    const apiKey = '8ed129544e1d7cdd472c9f40ac2121ba';

    inject('dataApi', {
        getHome
    })

    async function getHome(homeId) {
        const response = await fetch(`https://${appId}.algolia.net/1/indexes/homes/${homeId}`, {
            headers: {
                'X-Algolia-API-Key': apiKey,
                'X-Algolia-Application-Id': appId,
            }
        })

        const json = await response.json()
        return json
    }
}
