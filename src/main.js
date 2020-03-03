import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入模块
import axios from 'axios' // 引入axios
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less' // 引入样式
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册element-ui\
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的地址
Vue.prototype.$axios = axios // 将axios赋值给 Vue对象的原型属性
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
