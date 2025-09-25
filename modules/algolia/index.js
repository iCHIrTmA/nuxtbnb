import bodyParser from 'body-parser'
import userRouter from './routers/user'
import getApis from './apis'

export default function() {
    const algoliaConfig = this.options.privateRuntimeConfig.search
    const apis = getApis(algoliaConfig)
    console.log('algolia index.js', apis)

    this.nuxt.hook('render:setupMiddleware', (app) => {
        app.use(bodyParser.urlencoded())
        app.use('/api/user', userRouter(apis))
    })
}
