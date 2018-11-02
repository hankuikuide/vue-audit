import axios from 'axios'
import {
  Message
} from 'element-ui'

axios.interceptors.request.use(config => {
  return config
}, err => {
  Message.error({
    message: '请求超时'
  })
  return Promise.reject(err)
})

axios.interceptors.response.use(data => {
  console.dir(data)
  if (data.status !== 200) {
    Message.error({
      message: data.data.msg
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
  } else {
    Message.error({
      message: '未知错误'
    })
  }
  return Promise.reject(err)
})
