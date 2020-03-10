// 处理路由权限问题
import router from '@/router'
import progress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  progress.start()
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
router.afterEach(() => {
  setTimeout(() => {
    progress.done()
  }, 400)
})
