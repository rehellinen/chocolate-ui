/**
 *  index.js
 *  Create By rehellinen
 *  Create On 2018/11/28 10:24
 */
import Vue from 'vue'
import echarts from 'echarts'

import App from './App'
import { router } from './utils/router'

import 'sass/reset.sass'
import InfiniteScroll from './components/infinite-scroll/index'

Vue.directive(InfiniteScroll.name, InfiniteScroll)
Vue.prototype.$echarts = echarts

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
