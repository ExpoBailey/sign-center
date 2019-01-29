import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import Core from '@/components/Core'
import Admin from '@/components/admin/List'
import Person from '@/components/person/Person.vue'
import SignRecord from '@/components/person/SignRecord.vue'

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
      path: '/',
      name: 'core',
      component: Core
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin
    },
    {
      path: '/person',
      name: 'person',
      component: Person
    },
    {
      path: '/person/sign/record',
      name: 'signRecord',
      component: SignRecord
    }
  ]
})
