import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import secondHome from '@/views/home/second-home'
import Picture from '@/views/picture'
import Fansinfo from '@/views/fansinfo'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '',
        component: secondHome
      },
      {
        path: 'picture',
        component: Picture
      },
      {
        path: 'comment',
        component: () => import('@/views/comment')
      },
      {
        path: 'fansinfo',
        component: Fansinfo
      },
      {
        path: 'material',
        component: () => import('@/views/material')
      },
      {
        path: 'arctiles',
        component: () => import('@/views/arctiles')
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
