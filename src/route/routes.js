import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Table from '../views/nav1/Table.vue'

let routes = [{
  path: '/login',
  component: Login,
  name: '',
  hidden: true
}, {
  path: '/',
  component: Home,
  name: '原生控件',
  iconCls: 'el-icon-location',
  children: [{
    path: '/table',
    component: Table,
    name: '表格'
  }, {
    path: '/date',
    component: Table,
    name: '日期'
  }]
}, {
  path: '/',
  component: Home,
  name: '自定义控件',
  iconCls: 'el-icon-menu',
  children: [{
    path: '/dropdowntree',
    component: Table,
    name: '表格'
  }, {
    path: '/dropdowntable',
    component: Table,
    name: '日期'
  }]
}]

export default routes
