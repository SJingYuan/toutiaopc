import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui' // 引入模块
import '@/permission' // 权限模块
import Components from '@/components'
import axios from '@/utils/request' // 引入request.js
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import '@/styles/index.less' // 引入样式
import echarts from 'echarts'
Vue.use(Components)
Vue.prototype.$echarts = echarts
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册element-ui\
// 配置公共的地址
Vue.prototype.$axios = axios // 将axios赋值给 Vue对象的原型属性
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
