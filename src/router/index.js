import { createRouter, createWebHistory,createWebHashHistory} from 'vue-router'
import Login from '@/views/Login.vue'
const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home/home.vue')
  },
  // {
  //   path: '/cadres',
  //   name: 'Cadrese',
  //   component: () => import('@/views/Home/cadres.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
