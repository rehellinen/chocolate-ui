import Vue from 'vue'
import Router from 'vue-router'

import CoverSelector from '../pages/cover-selector/cover-selector'
import RollToLoad from '../components/roll-to-load/roll-to-load'

Vue.use(Router)

const routes = [
  { path: '/cover_selection', component: CoverSelector },
  { path: '/roll_to_load', component: RollToLoad }
]

export const router = new Router({
  routes
})
