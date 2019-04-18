import axios from 'axios'
import store from '../store/index'
import {
  Message
} from 'element-ui'

axios.defaults.baseURL = process.env.BASE_API

axios.interceptors.request.use(config => {
  // 判断是否存在token，如果存在的话，则每个http header都加上token
  if (store.state.token) {
    config.headers['x-auth-token'] = store.state.token
  }
  return config
}, err => {
  Message.error({
    message: '请求超时'
  })
  return Promise.reject(err)
})

axios.interceptors.response.use(data => {
  if (data.status !== 200) {
    Message.error({
      message: data.data.msg
    })
    return Promise.reject(data)
  }
  if (data.data.status === 500) {
    Message.error({
      message: '操作失败，请刷新后重试'
    })
    return Promise.reject(data)
  }
  return Promise.resolve(data)
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    Message.error({
      message: 'NOT FOUND ERROR ' + err.response.status
    })
  } else if (err.response.status === 403) {
    Message.error({
      message: 'NOT FOUND ERROR 403'
    })
  } else if (err.response.status === 500) {
    Message.error({
      message: err.response.data.msg
    })
  } else {
    Message.error({
      message: '未知错误'
    })
  }
  return Promise.reject(err)
})
