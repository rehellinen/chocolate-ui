import Vue from 'vue'
import Router from 'vue-router'

import CoverSelector from '../pages/cover-selector/cover-selector'
import InfiniteScroll from '../pages/infinite-scroll/infinite-scroll'
import Echarts from '../pages/echarts/echarts'

Vue.use(Router)

const routes = [
  { path: '/cover_selection', component: CoverSelector },
  { path: '/infinite_scroll', component: InfiniteScroll },
  { path: '/echarts', component: Echarts }
]

export const router = new Router({
  routes
})
