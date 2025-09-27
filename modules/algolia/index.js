import bodyParser from 'body-parser'
import userRouter from './routers/user'
import homesRouter from './routers/homes'
import getApis from './apis'

export default function() {
    const algoliaConfig = this.options.privateRuntimeConfig.search
    const apis = getApis(algoliaConfig)
    console.log('algolia index.js', apis)

    this.nuxt.hook('render:setupMiddleware', (app) => {
        app.use(bodyParser.json())
        app.use('/api/user', userRouter(apis))
        app.use('/api/homes', homesRouter(apis))
    })
}
