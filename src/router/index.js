import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Core from '@/components/Core'
import CalendarShow from '@/components/CalendarShow'
import FullCalendar from '@/components/FullCalendar/FullCalendar'
import Calendario from '@/components/Calendario/Calendario'
import MobileCalendar from '@/components/MobileCalendar/MobileCalendar'

Vue.use(Router);

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
      path: '/full-calendar',
      name: 'fullCalendar',
      component: FullCalendar
    },
    {
      path: '/calendario',
      name: 'calendario',
      component: Calendario
    },
    {
      path: '/mobile-calendar',
      name: 'mobileCalendar',
      component: MobileCalendar
    },
    {
      path: '/',
      name: 'core',
      component: Core
    }
  ]
})
