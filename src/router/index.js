import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Core from '@/components/Core'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/core',
      name: 'core',
      component: Core
    },
    {
      path: '/',
      name: 'core',
      component: Core
    }
  ]
})
