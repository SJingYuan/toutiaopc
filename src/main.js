import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'// 引入模块
import 'element-ui/lib/theme-chalk/index'// 引入样式
Vue.config.productionTip = false
Vue.use(ElementUI)// 全局注册
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
