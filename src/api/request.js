import axios from 'axios'

// let remote = 'http://10.117.150.34:39000'
let base = ''

export const postRequest = (url, params) => {
  return axios({
    method: 'post',
    url: `${base}${url}`,
    data: params,
    // transformRequest: [function (data) {
    //   let ret = ''
    //   for (let it in data) {
    //     ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it] + '&')
    //   }
    //   return ret
    // }],
    headers: {
      'Content-Type': 'application/x-www-from-urlencoded'
    }
  })
}

export const getRequest = (url, params) => {
  return axios({
    method: 'get',
    url: `${base}${url}`,
    data: params
  })
}
