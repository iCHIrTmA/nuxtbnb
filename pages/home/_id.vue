<template v-if="Object.keys(home).length && Object.keys(home.location).length">
    <div class="app-container">
        <PropertyGallery :images="home.images"/>
        <PropertyDetails :home="home"/>
        <div style="display: flex;">
            <img v-for="image in home.images" :key="image" :src="image" width="200" height="150" />
        </div>
        {{ home.title }} <br/>
        ${{ home.pricePerNight }} / night<br/>
        <img src="/images/marker.svg" width="20" height="20" /> {{ home?.location?.address }} {{ home?.location?.city }} {{ home?.location?.state }} {{ home?.location?.country }}<br/>
        <img src="/images/star.svg" width="20" height="20" /> {{ home?.location?.reviewValue }} <br />
        {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath<br/>
        {{ home.description }}
        <div style="height:800px;width:800px;" ref="map"></div>
        <div v-for="review in reviews" :key="review.objectID">
            <img :src="review.reviewer.image" /> <br />
            {{ review.reviewer.name }} <br />
            {{ review.date }} <br />
            <!-- {{ review.comment }} <br /> -->
            <short-text :text="review.comment" :target="150" /> <br />
        </div>

        <img :src="user.image" /> <br />
        {{ user.name }} <br />
        {{ user.joined }} <br />
        {{ user.reviewCount }} <br />
        {{ user.description }} <br />
    </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader';

export default {
    head() {
        return {
            title: this.home.title,
        }
    },
    async asyncData({ params, $dataApi, error }) {
        const responses = await Promise.all([
            $dataApi.getHome(params.id),
            $dataApi.getReviewsByHomeId(params.id),
            $dataApi.getUserByHomeId(params.id)
        ])

        const badResponse = responses.find((response) => !response.ok)
        if (badResponse) {
            return error({ statusCode: badResponse.status, message: badResponse.statusText })
        }

        return {
            home: responses[0].json,
            reviews: responses[1].json.hits,
            user: responses[2].json.hits[0],
        }
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
    }
}
</script>