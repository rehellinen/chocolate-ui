import Vue from 'vue'
import Router from 'vue-router'

import CoverSelection from '../components/cover-selection/cover-selection'
import RollToLoad from '../components/roll-to-load/roll-to-load'

Vue.use(Router)

const routes = [
  { path: '/cover_selection', component: CoverSelection },
  { path: '/roll_to_load', component: RollToLoad }
]

export const router = new Router({
  routes
})
