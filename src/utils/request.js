/****
 * 封装请求工具 request.js
 * 对于 axios的二次封装
 * 配置拦截器 以及其他
 * ****/
import axios from 'axios'
import router from '@/router'
// 拦截器及其他操作
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 配置公共的请求头地址

// 请求拦截器的开发
axios.interceptors.request.use(function (con) {
  const token = localStorage.getItem('user-token') // 从兜里拿钥匙 也就是从缓存中取token
  con.headers.Authorization = `Bearer ${token}` // 统一注入token
  return con
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器的开发
axios.interceptors.response.use(function (res) {
  return res.data ? res.data : {} // 有的接口 没有任何的响应数据
  // 成功的时候执行
}, function (err) {
  if (err.response.status === 401) {
    localStorage.removeItem('user-token')
    router.push('/login')
  }
  return Promise.reject(err)
})
export default axios
