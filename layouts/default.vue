<template>
    <div class="app">
        <header class="app-header">
            <div class="app-logo">
                <img src="/images/logo.svg" />
            </div>
            <div class="app-search">
                <input type="text" ref="citySearch" @changed="changed" placeholder="Enter your address" />
                <input type="text" ref="datepicker" placeholder="Check in" />
                <input type="text" ref="datepicker" placeholder="Check out" />
                <button>
                    <img src="/images/icons/search.svg" />
                </button>
            </div>
            <div class="app-user-menu">
                <img src="/images/icons/house.svg" />
                <div class="name">Host</div>
                <script src="https://accounts.google.com/gsi/client" async defer></script>
                <div id="googleButton">
                    <div
                        id="g_id_onload"
                        :data-client_id="$config.auth.clientId"
                        data-callback="auth">
                    </div>
                    
                    <div class="g_id_signin" data-type="standard"></div>
                </div>

                <!-- <img src="/images/user.jpg" class="avatar"/> -->
            </div>
        </header>
        <nuxt />
    </div>
</template>
<script>
export default {
    mounted() {
        this.$maps.makeAutoComplete(this.$refs.citySearch);
        window.google.accounts.id.initialize({
            client_id: this.googleClientId,
            callback: this.handleCredentialResponse, // Reference the method
        });
    },
    methods: {
        changed(event) {
            const place = event.detail;
            if (!place.geometry) {
                return;
            }

            this.$router.push({
                name: 'search',
                query: {
                    lat: place.geometry.location.lat(),
                    lng: place.geometry.location.lng(),
                    label: this.$refs.citySearch.value
                }
            })
        },
    }
}
</script>