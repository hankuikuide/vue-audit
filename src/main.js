import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import router from './route/routes'
import store from './store'
//  import Mock from './mock'
import 'font-awesome/css/font-awesome.min.css'
import './http/wrapper'
import {
  getRequest,
  postRequest
} from './api/request'

// 启用mockjs
// Mock.bootstrap()

Vue.use(ElementUI)
Vue.use(Vuex)

// Vue扩展axios http请求
Vue.prototype.getRequest = getRequest
Vue.prototype.postRequest = postRequest

/* eslint-disable no-new */
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
