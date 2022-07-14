import Vue from 'vue'
import VueRouter, { RouteConfig, NavigationGuardNext, Route } from 'vue-router'
import HomeView from '~/pages/HomeView.vue'
import { RouteNames } from './route-name'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: RouteNames.Manage,
    redirect: { name: RouteNames.Experiments },
  },
  {
    path: '/experiments',
    name: RouteNames.Experiments,
    component: () => import('~/pages/manage/ExperimentsPage.vue'),
  },
  {
    path: '/feature-flags',
    name: RouteNames.FeatureFlags,
    component: () => import('~/pages/manage/FeatureFlagsPage.vue'),
  },
  {
    path: '/user',
    name: RouteNames.User,
    redirect: { name: RouteNames.Profile },
  },
  {
    path: '/profile',
    name: RouteNames.Profile,
    component: () => import('~/pages/user/ProfilePage.vue'),
  },
  {
    path: '/settings',
    name: RouteNames.Settings,
    component: () => import('~/pages/user/SettingsPage.vue'),
  },
  {
    path: '/documentation',
    name: RouteNames.Documentation,
    component: () => import('~/pages/user/DocumentationPage.vue'),
  },
  {
    path: '/faq',
    name: RouteNames.Faqs,
    component: () => import('~/pages/user/FaqsPage.vue'),
  },
  {
    path: '/404',
    name: RouteNames.NotFound,
    component: () => import('~/pages/404Page.vue'),
    beforeEnter(to: Route, _from: Route, next: NavigationGuardNext): void {
      // Clear query string before entry
      if (Object.keys(to.query).length > 0) {
        return next({ name: to.name as string, query: undefined })
      }
      return next()
    },
  },
  {
    path: '*',
    redirect: RouteNames.NotFound,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/AboutView.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
