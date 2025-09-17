import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3326a12a = () => interopDefault(import('../pages/admin.vue' /* webpackChunkName: "pages/admin" */))
const _283ace66 = () => interopDefault(import('../pages/admin/test.vue' /* webpackChunkName: "pages/admin/test" */))
const _a9efcee8 = () => interopDefault(import('../pages/no-access.vue' /* webpackChunkName: "pages/no-access" */))
const _d3262888 = () => interopDefault(import('../pages/search.vue' /* webpackChunkName: "pages/search" */))
const _96054924 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))
const _f63edac4 = () => interopDefault(import('../pages/home/_id.vue' /* webpackChunkName: "pages/home/_id" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/admin",
    component: _3326a12a,
    name: "admin",
    children: [{
      path: "test",
      component: _283ace66,
      name: "admin-test"
    }]
  }, {
    path: "/no-access",
    component: _a9efcee8,
    name: "no-access"
  }, {
    path: "/search",
    component: _d3262888,
    name: "search"
  }, {
    path: "/",
    component: _96054924,
    name: "index"
  }, {
    path: "/home/:id?",
    component: _f63edac4,
    name: "home-id"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
