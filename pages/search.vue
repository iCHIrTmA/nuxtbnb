<template>
    <div class="app-search-results-page">
        <div class="app-search-results">
            <div class="app-search-results-listing">
                <h2 class="app-title">Stays in {{ label }}</h2>
                <nuxt-link v-for="home in homes" :key="home.objectID" :to="`home/${home.objectID}`">
                    <HomeRow class="app-house" :home="home"></HomeRow>
                </nuxt-link>
            </div>
            <div class="app-search-results-map">
                <div class="app-map" ref="map"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    head() {
        return {
            title: `Homes around ${this.label}`
        }
    },
    mounted() {
        this.updateMap()
    },
    methods: {
        updateMap() {
            this.$maps.showMap(this.$refs.map, this.lat, this.lng, this.getHomeMarkers())
        },
        getHomeMarkers() {
            if (this.homes.length === 0) {
                return null;
            }

            return this.homes.map((property) => { return { ...property._geoloc, pricePerNight: property.pricePerNight }})
        }
    },
    async beforeRouteUpdate(to, from, next) {
        const data = await this.$dataApi.getHomesByLocation(to.query.lat, to.query.lng);
        this.homes = data.json.hits;
        this.label = to.query.label;
        this.lat = to.query.lat;
        this.lng = to.query.lng;
        this.updateMap()
        next()
    },
    async asyncData({ query, $dataApi }) {
        const data = await $dataApi.getHomesByLocation(query.lat, query.lng);

        return {
            homes: data.json.hits,
            label: query.label,
            lat: query.lat,
            lng: query.lng,
        }
    }
}
</script>

<style>
.marker {
    background-color: white;
    border: 1px solid lightgray;
    font-weight: bold;
    border-radius: 20px;
    padding: 5px 8px;
}
</style>