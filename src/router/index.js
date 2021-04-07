import Vue from 'vue'
import Router from 'vue-router'
import Wicket from '@/views/wicket'
import JobNum from '@/views/jobNum'
import Incident from '@/views/incident'
import Department from '@/views/department'
import Today from '@/views/today'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children: [{
        path: 'wicket',
        name: 'wicket',
        component: Wicket

      }, {
        path: 'jobNum',
        name: 'jobNum',
        component: JobNum

      }, {
        path: 'incident',
        name: 'incident',
        component: Incident

      }, {
        path: 'department',
        name: 'department',
        component: Department

      }, {
        path: 'today',
        name: 'today',
        component: Today

      }
      ]
    },

  ]
})
