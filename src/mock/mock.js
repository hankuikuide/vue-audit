import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import {
  LoginUsers,
  Users
} from './data/user'
let _User = Users

export default {
  bootstrap () {
    let mock = new MockAdapter(axios)

    // Login
    mock.onPost('/login').reply(config => {
      let {
        username,
        password
      } = JSON.parse(config.data)

      return new Promise((resolve, reject) => {
        let user = null

        setTimeout(() => {
          let hasUser = LoginUsers.some(u => {
            if (u.username === username && u.password === password) {
              user = JSON.parse(JSON.stringify(u))
              user.password = undefined
              return true
            }
          })

          if (hasUser) {
            resolve([200, {
              code: 200,
              msg: '请求成功',
              user
            }])
          } else {
            resolve([500, {
              code: 500,
              msg: '账号或密码错误'
            }])
          }
        }, 1000)
      })
    })

    // User List
    mock.onGet('/user/listpage').reply(config => {
      let {
        page,
        name
      } = JSON.parse(config.data)

      let mockUsers = _User.filter(user => {
        if (name && user.name.indexOf(name) === -1) {
          return false
        }
        return true
      })
      let total = mockUsers.length
      mockUsers = mockUsers.filter((u, index) => index < 20 * page && index >= 20 * (page - 1))
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            total: total,
            users: mockUsers
          }])
        }, 1000)
      })
    })
  }
}
