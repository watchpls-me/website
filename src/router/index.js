import Vue from 'vue'
import VueRouter from 'vue-router'

import Toolbar from '../components/Toolbar'

import Home from '../views/Home.vue'
import Room from '../views/Room'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/r/:id',
    name: 'room',
    meta: {icon: 'fas fa-person-booth'},
    components: {
      header: Toolbar,
      default: Room,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
