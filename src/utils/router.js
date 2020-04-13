import Vue from 'vue'
import Router from 'vue-router'

import CoverSelector from '../pages/cover-selector/cover-selector'
import InfiniteScroll from '../pages/infinite-scroll/infinite-scroll'

Vue.use(Router)

const routes = [
  { path: '/cover_selection', component: CoverSelector },
  { path: '/infinite_scroll', component: InfiniteScroll }
]

export const router = new Router({
  routes
})
