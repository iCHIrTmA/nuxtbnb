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
        showMap,
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

    async function showMap(containerEl, lat, lng, markers) {
        const loader = new Loader({
            apiKey: 'AIzaSyDCuFuuOfMuFiaH0cdSbjT-6YSrHpIyyVQ',
            version: 'weekly', // Or a specific version like '3.51'
            libraries: ['places', 'marker'] // Add any necessary libraries
            });

        loader.load()
            .then(() => {
            console.log(lat)
            console.log(lng)
            // Now google.maps is available
            const position = { lat: lat, lng: lng }
            const map = new google.maps.Map(containerEl, {
                center: position,
                zoom: 18,
                mapId: 'DEMO_MAP_ID',
            });
            // ... further map operations
            if (! markers) {
                new google.maps.marker.AdvancedMarkerElement({ map: map, position: position, });
                return;
            }

            const bounds = new google.maps.LatLngBounds()
            markers.forEach((property) => {
                const position = new google.maps.LatLng(property.lat, property.lng);
                new google.maps.marker.AdvancedMarkerElement({ map: map, position: position, });
                bounds.extend(position)
            })

            map.fitBounds(bounds);
            
            }).catch(error => {
            console.error("Error loading Google Maps API:", error);
            });
    }
}
