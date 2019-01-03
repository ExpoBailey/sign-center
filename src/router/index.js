import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Core from '@/components/Core'
import CalendarShow from '@/components/CalendarShow'

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
      path: '/calendar',
      name: 'calendar',
      component: CalendarShow
    },
    {
      path: '/',
      name: 'core',
      component: Core
    }
  ]
})
