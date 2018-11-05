import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import UserManager from '../views/sys/UserManager.vue'

let routes = [{
  path: '/login',
  component: Login,
  name: '',
  hidden: true
}, {
  path: '/',
  name: 'Dashboard',
  iconCls: 'el-icon-menu',
  component: Home,
  leaf: true
},
{
  path: '/',
  component: Home,
  name: '原生控件',
  iconCls: 'el-icon-location',
  children: [{
    path: '/table',
    component: UserManager,
    name: '表格'
  }, {
    path: '/date',
    component: UserManager,
    name: '日期'
  }]
}, {
  path: '/',
  component: Home,
  name: '自定义控件',
  iconCls: 'el-icon-view',
  children: [{
    path: '/dropdowntree',
    component: UserManager,
    name: '表格'
  }, {
    path: '/dropdowntable',
    component: UserManager,
    name: '日期'
  }]
}
]

export default routes
