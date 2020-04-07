import Vue from 'vue'
import Router from 'vue-router'

import CoverSelector from '../pages/cover-selector/cover-selector'
import LoadMore from '../components/load-more/load-more'

Vue.use(Router)

const routes = [
  { path: '/cover_selection', component: CoverSelector },
  { path: '/load_more', component: LoadMore }
]

export const router = new Router({
  routes
})
