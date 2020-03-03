// 处理路由权限问题
import router from '@/router'
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})
