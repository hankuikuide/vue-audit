// "@"相当于".."

let routes = [{
  path: '/login',
  component: resolve => require(['../views/Login.vue'], resolve),
  name: '',
  hidden: true
}, {
  path: '/',
  name: 'Dashboard',
  iconCls: 'el-icon-menu',
  component: resolve => require(['../views/Home.vue'], resolve),
  leaf: true
},
{
  path: '/',
  component: resolve => require(['../views/Home.vue'], resolve),
  name: '原生控件',
  iconCls: 'el-icon-location',
  children: [{
    path: '/audit',
    component: resolve => require(['../views/audit/Audit.vue'], resolve),
    name: '审核'
  }, {
    path: '/opinion',
    component: resolve => require(['../views/sys/UserManager.vue'], resolve),
    name: '意见书'
  }, {
    path: '/table',
    component: resolve => require(['../views/sys/UserManager.vue'], resolve),
    name: '表格'
  }, {
    path: '/order',
    component: resolve => require(['../views/order/OrderManager.vue'], resolve),
    name: '订单'
  }]
}, {
  path: '/',
  component: resolve => require(['../views/Home.vue'], resolve),
  name: '系统管理',
  iconCls: 'el-icon-view',
  children: [{
    path: '/dropdowntree',
    component: resolve => require(['../views/sys/UserManager.vue'], resolve),
    name: '用户管理'
  }, {
    path: '/dropdowntable',
    component: resolve => require(['../views/sys/UserManager.vue'], resolve),
    name: '角色管理'
  }]
}
]

export default routes
