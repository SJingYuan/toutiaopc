import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import secondHome from '@/views/home/second-home'
import Picture from '@/views/home/picture'
import Fansinfo from '@/views/home/fansinfo'
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
