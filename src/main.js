// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// 引入样式重置
import '@/assets/css/reset.css'
// 引入MINUI
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.min.css'
// 淘宝方案
import 'amfe-flexible'
// mock数据
import '@/mock'
//  引入muse-ui
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'

import sheet from '@/components/sheet'
//  自定义过滤
import filters from '@/filter'
Vue.config.productionTip = false
Vue.use(MintUi)
Vue.use(MuseUI)

Vue.component('Sheet', sheet)

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
