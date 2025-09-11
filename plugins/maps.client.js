import { Loader } from '@googlemaps/js-api-loader';

export default function (context, inject) {
    // const appId = 'EPZ034JVX7';
    // const apiKey = '8ed129544e1d7cdd472c9f40ac2121ba';
    // const headers = {
    //     'X-Algolia-API-Key': apiKey,
    //     'X-Algolia-Application-Id': appId,
    // }

    inject('maps', {
        makeAutoComplete,
    })

    async function makeAutoComplete(input) {
        console.log('hello from maps plugin')
        console.log(input)
        const loader = new Loader({
            apiKey: 'AIzaSyDCuFuuOfMuFiaH0cdSbjT-6YSrHpIyyVQ',
            version: 'weekly', // Or a specific version like '3.51'
            libraries: ['places', 'marker'] // Add any necessary libraries
            });

        loader.load()
            .then(() => {
                const autoComplete = new google.maps.places.Autocomplete(input, { types: ['(cities)'] });
                autoComplete.addListener('place_changed', () => {
                    const place = autoComplete.getPlace();
                    input.dispatchEvent(new CustomEvent('changed', { detail: place }))
                })
            }).catch(error => {
                console.error("Error loading Google Maps API:", error);
            });
    }
}
