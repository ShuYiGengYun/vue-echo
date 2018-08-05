import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index/index'
import Detail from '@/page/detail/index'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: Index
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    console.log(savedPosition)
    return {
      x: 0,
      y: 0
    }
  }
})
