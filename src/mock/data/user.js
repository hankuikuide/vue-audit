import Mock from 'mockjs'

const LoginUsers = [{
  id: 1,
  username: 'admin',
  password: '123456',
  avatar: 'http://img4.duitang.com/uploads/item/201410/04/20141004220008_v5axF.jpeg',
  name: '系统管理员'
}]

const Users = []

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    email: Mock.Random.email('163.com'),
    sex: Mock.Random.integer(0, 1),
    state: Mock.Random.integer(1, 2)
  }))
}

export {
  LoginUsers,
  Users
}
