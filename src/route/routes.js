import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import {
  getRequest
} from '../api/request'

Vue.use(Router)

const router = new Router({
  routes: [{
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
    name: '权限管理',
    iconCls: 'el-icon-location',
    children: [{
      path: '/group',
      component: resolve => require(['../views/sys/group/GroupManager.vue'], resolve),
      name: '组权限管理'
    }, {
      path: '/role',
      component: resolve => require(['../views/sys/role/RoleManager.vue'], resolve),
      name: '角色权限管理'
    }, {
      path: '/user',
      component: resolve => require(['../views/sys/user/UserService.vue'], resolve),
      name: '用户权限管理'
    }, {
      path: '/log',
      component: resolve => require(['../views/sys/log/LogManager.vue'], resolve),
      name: '操作日志'
    }, {
      path: '/syspaly',
      component: resolve => require(['../views/audio/Play.vue'], resolve),
      name: '听录音'
    }, {
      path: '/showbook',
      component: resolve => require(['../views/audio/Book.vue'], resolve),
      name: '书箱列表'
    }, {
      path: '/lession',
      component: resolve => require(['../views/audio/Lession.vue'], resolve),
      name: '课程列表'
    }]
  }
  ]
})

router.beforeEach((to, from, next) => {
  // 登录界面登录成功之后，会把用户信息保存在会话
  // 存在时间为会话生命周期，页面关闭即失效。
  let userName = sessionStorage.getItem('user')
  if (to.path === '/login') {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (userName) {
      next({
        path: '/'
      })
    } else {
      next()
    }
  } else {
    if (!userName) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({
        path: '/login'
      })
    } else {
      // 加载动态菜单和路由
      addDynamicMenuAndRoutes(userName, to, from)
      next()
    }
  }
})

/**
 * 加载动态菜单和路由
 */
function addDynamicMenuAndRoutes (userName, to, from) {
  if (store.state.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return
  }

  getRequest('/config/sysmenu').then(resp => {
    if (resp && resp.status === 200) {
      // 添加动态路由
      let dynamicRoutes = getDynamicRoutes(resp.data.data)
      if (!store.state.menuRouteLoaded) {
        router.options.routes = router.options.routes.concat(dynamicRoutes)
        router.addRoutes(router.options.routes)
        // 保存加载状态
        store.commit('menuRouteLoaded', true)
        // 保存菜单树
        store.commit('setNavTree', resp.data.data)
      }
    }
  })
}

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function getDynamicRoutes (menuList = [], parentId = null) {
  var routes = []
  for (var i = 0; i < menuList.length; i++) {
    // 第一层parentId为空，遍历父节点，再根据parentid遍历子节点
    if (menuList[i].parentId === parentId && menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        id: menuList[i].id,
        path: menuList[i].path,
        iconCls: menuList[i].iconCls,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        },
        leaf: menuList[i].leaf === 1
      }
      try {
        // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
        let url = menuList[i].url
        route['component'] = resolve => require([`../views/${url}`], resolve)
      } catch (e) {}
      // 如果是parentid为空，leaf为0说明有子菜单，需要遍历数组
      if (!menuList[i].leaf) {
        route.children = getDynamicRoutes(menuList, route.id)
      }
      routes.push(route)
    }
  }
  return routes
}

export default router
