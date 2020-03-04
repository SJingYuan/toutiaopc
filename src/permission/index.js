// 处理路由权限问题
import router from '@/router'
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next() // 放过
    } else {
      next('/login') // 回登录页 去拿钥匙
    }
  } else {
    //   如果我不是去主页相关
    next() // 直接放过
  }
})
