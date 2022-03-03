import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'


const routes: Array<RouteRecordRaw> = [
  
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/available',
    name: 'available',
    component: () => import('../views/Available.vue')
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/encode',
    name: 'encode',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Encode.vue')
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('../views/Search.vue')
  },
  {
    path: '/upload',
    name: 'upload',
    component: () => import('../views/Upload.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes
})

export default router
