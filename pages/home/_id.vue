<template>
    <div>
        <div style="display: flex;">
            <img v-for="image in home.images" :key="image" :src="image" width="200" height="150" />
        </div>
        {{ home.title }} <br/>
        ${{ home.pricePerNight }} / night<br/>
        <img src="/images/marker.svg" width="20" height="20" /> {{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}<br/>
        <img src="/images/star.svg" width="20" height="20" /> {{ home.location.reviewValue }} <br />
        {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath<br/>
        <div style="height:800px;width:800px;" ref="map"></div>
    </div>
</template>

<script>
import homes from '~/data/homes'
import { Loader } from '@googlemaps/js-api-loader';
export default {
    head() {
        return {
            title: this.home.title,
            // script: [{
            //     src: "https://maps.googleapis.com/maps/api/js?key=AIzaSyDCuFuuOfMuFiaH0cdSbjT-6YSrHpIyyVQ&loading=async&libraries=places&callback=initMap",
            //     hid: "map",
            // }],
        }
    },
    data() {
        return {
            home: {}
        }
    },
    created() {
        const home = homes.find((home) => home.objectID == this.$route.params.id)
        this.home = home
    },
    mounted() {
        const loader = new Loader({
            apiKey: 'AIzaSyDCuFuuOfMuFiaH0cdSbjT-6YSrHpIyyVQ',
            version: 'weekly', // Or a specific version like '3.51'
            libraries: ['places', 'marker'] // Add any necessary libraries
            });

            loader.load().then(() => {
            // Now google.maps is available
            const position = { lat: this.home._geoloc.lat, lng: this.home._geoloc.lng }
            const map = new google.maps.Map(this.$refs.map, {
                center: position,
                zoom: 18,
                mapId: 'DEMO_MAP_ID',
            });
            // ... further map operations
            const marker = new google.maps.marker.AdvancedMarkerElement({
                map: map,
                position: position,
                title: this.home.title,
            });
            }).catch(error => {
            console.error("Error loading Google Maps API:", error);
            });
        // const map = new google.maps.Map(this.$refs.map, {
        //     center: { lat: this.home._geoloc.lat, lng: this.home._geoloc.lng },
        //     zoom: 18,
        // })
    }
}
</script>