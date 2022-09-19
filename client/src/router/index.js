import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

import store from '@/store'
import api from '@/api'

const routes = [
  {
    path: '/',
    component: HomeView
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/register',
    component: Register
  },
  {
    path: '/profile',
    component: () => import('../views/Profile.vue') //IMPORT DINAMICO SOLO SE IMPORTA CUANDO ESTE EN ESE PATH
    
  },
  {
    path: '/upload',
    component: () => import('../views/Upload.vue') 
    
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const protectedRoutes = ["/profile, /upload"]
  if(protectedRoutes.includes(to.path) && !store.getters.token)
    next('/login')
  else
    next()
})

export default router
