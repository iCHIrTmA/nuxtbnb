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
    plugins: [ '~/plugins/dataApi', '~/plugins/maps.client'],
    // modules: [ '~/modules/test', { message: 'my module!!!!'}],
    modules: [['~/modules/test', { message: 'my module!!!!'}]],
}