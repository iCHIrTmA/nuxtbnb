import { Loader } from '@googlemaps/js-api-loader';

export default function ({ $config }, inject) {
    inject('maps', {
        makeAutoComplete,
        showMap,
    })

    async function makeAutoComplete(input) {
        const loader = new Loader({
            apiKey: $config.maps.apiKey,
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
            apiKey: $config.maps.apiKey,
            version: 'weekly', // Or a specific version like '3.51'
            libraries: ['places', 'marker'] // Add any necessary libraries
            });

        loader.load()
            .then(() => {
            // Now google.maps is available
            const position = { lat: lat, lng: lng }
            const map = new google.maps.Map(containerEl, {
                center: position,
                zoom: 18,
                mapId: 'DEMO_MAP_ID',
                styles: [{
                    featureType: 'poi.business',
                    elementType: 'labels.icon',
                    stylers: [{visibility: 'off'}]
                }],
            });
            // ... further map operations
            if (! markers) {
                new google.maps.marker.AdvancedMarkerElement({ map: map, position: position, });
                return;
            }

            const bounds = new google.maps.LatLngBounds()
            markers.forEach((property) => {
                const position = new google.maps.LatLng(property.lat, property.lng);

                const pinTextGlyph = new google.maps.marker.PinElement({
                    glyph: `$${property.pricePerNight}`,
                    glyphColor: 'black',
                    background: 'white',
                    borderColor: 'lightgray',
                });

                new google.maps.marker.AdvancedMarkerElement({
                    map: map,
                    position: position,
                    content: 'https://maps.gstatic.com/mapfiles/transparent.png',
                    content: pinTextGlyph.element,
                });
                bounds.extend(position)
            })

            map.fitBounds(bounds);
            
            }).catch(error => {
            console.error("Error loading Google Maps API:", error);
            });
    }
}
