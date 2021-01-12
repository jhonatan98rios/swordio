import Vue from 'vue'
import VueRouter from 'vue-router'
import Welcome from '../views/Welcome.vue'
import RoomCreation from '../views/RoomCreation.vue'
import Arena from '../views/Arena.vue'
import Perfil from '../views/Perfil.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome
  },
  {
    path: '/salas',
    name: 'RoomCreation',
    component: RoomCreation
  },
  {
    path: '/arena',
    name: 'Arena',
    component: Arena
  },
  {
    path: '/perfil',
    name: 'Perfil',
    component: Perfil
  },
]

const router = new VueRouter({
  routes
})

export default router
