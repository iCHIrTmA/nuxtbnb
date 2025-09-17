export default {
    components: true,
    head: {
        titleTemplate: "Mastering Nuxt: %s",
        htmlAttrs: {
            lang: "en"
        },
        bodyAttrs: {
            class: ["my-style"]
        },
        meta: [{
            charset: "utf-8",
        }]
    },
    router: {
        prefetchLinks: false,
    },
    plugins: [ '~/plugins/dataApi', '~/plugins/maps.client', '~/plugins/auth.client'],
    modules: ['~/modules/auth', '~/modules/algolia'],
    buildModules: ['@nuxtjs/tailwindcss'],
    css: ['~/assets/sass/app.scss'],
    build: {
        extractCSS: true,
        loaders: {
            limit: 0,
        }
    },
    publicRuntimeConfig: {
        auth: {
            cookieName: 'idToken',
            clientId: '272062574739-3isefhj2sfrgln50b5f94kdj9srusag7.apps.googleusercontent.com'
        },
        maps: {
            apiKey: process.env.GOOGLE_MAPS_API
        },
        search: {
            appId: process.env.ALGOLIA_APP_ID,
            apiKey: process.env.ALGOLIA_API
        }
    },
    privateRuntimeConfig: {
        search: {
            appId: process.env.ALGOLIA_APP_ID,
            apiKey: process.env.ALGOLIA_API_CREATE_OBJECT
        }
    }
}