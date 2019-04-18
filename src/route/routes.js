import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'
import Home from '@/views/Home'
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
  // 处理IFrame嵌套页面
  // handleIFrameUrl(to.path)
  if (store.state.menuRouteLoaded) {
    console.log('动态菜单和路由已经存在.')
    return
  }

  getRequest('/config/sysmenu').then(resp => {
    if (resp && resp.status === 200) {
      // 添加动态路由
      let dynamicRoutes = addDynamicRoutes(resp.data.data)
      console.dir(dynamicRoutes)
      // 处理静态组件绑定路由
      handleStaticComponent(router, dynamicRoutes)
      console.dir('router.options.routes')
      console.dir(router.options.routes)
      router.addRoutes(router.options.routes)
      // 保存加载状态
      store.commit('menuRouteLoaded', true)
      // 保存菜单树
      store.commit('setNavTree', resp.data.data)
      // store.dispatch('connect')
    }
  })

  // api.menu.findNavTree({
  //   'userName': userName
  // })
  //   .then(res => {
  //     // 添加动态路由
  //     let dynamicRoutes = addDynamicRoutes(res.data)
  //     // 处理静态组件绑定路由
  //     handleStaticComponent(router, dynamicRoutes)
  //     router.addRoutes(router.options.routes)
  //     // 保存加载状态
  //     store.commit('menuRouteLoaded', true)
  //     // 保存菜单树
  //     store.commit('setNavTree', res.data)
  //   }).then(res => {
  //     api.user.findPermissions({
  //       'name': userName
  //     }).then(res => {
  //       // 保存用户权限标识集合
  //       store.commit('setPerms', res.data)
  //     })
  //   })
  //   .catch(function (res) {})
}

/**
 * 处理路由到本地直接指定页面组件的情况
 * 比如'代码生成'是要求直接绑定到'Generator'页面组件
 */
function handleStaticComponent (router, dynamicRoutes) {
  for (let j = 0; j < dynamicRoutes.length; j++) {
    if (dynamicRoutes[j].name === '代码生成') {
      dynamicRoutes[j].component = Home
      break
    }
  }
  router.options.routes[0].children = router.options.routes[0].children.concat(dynamicRoutes)
}

/**
 * 处理IFrame嵌套页面
 */
// function handleIFrameUrl (path) {
//   // 嵌套页面，保存iframeUrl到store，供IFrame组件读取展示
//   let url = path
//   let length = store.state.iframe.iframeUrls.length
//   for (let i = 0; i < length; i++) {
//     let iframe = store.state.iframe.iframeUrls[i]
//     if (path != null && path.endsWith(iframe.path)) {
//       url = iframe.url
//       store.commit('setIFrameUrl', url)
//       break
//     }
//   }
// }

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */
function addDynamicRoutes (menuList = [], routes = []) {
  var temp = []
  console.dir(menuList)

  for (var i = 0; i < menuList.length; i++) {
    console.dir(1111111111111111111)

    if (menuList[i].children && menuList[i].children.length >= 1) {
      console.dir(333333333333333333333333)

      temp = temp.concat(menuList[i].children)
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      menuList[i].url = menuList[i].url.replace(/^\//, '')
      // 创建路由配置
      var route = {
        path: menuList[i].url,
        component: null,
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        }
      }

      console.dir(222222222222222222222)
      let path = '' // getIFramePath(menuList[i].url)
      if (path) {
        // 如果是嵌套页面, 通过iframe展示
        route['path'] = path
        // route['component'] = resolve => require([`@/views/IFrame/IFrame`], resolve)
        // 存储嵌套页面路由路径和访问URL
        let url = '' // getIFrameUrl(menuList[i].url)
        let iFrameUrl = {
          'path': path,
          'url': url
        }
        store.commit('addIFrameUrl', iFrameUrl)
      } else {
        try {
          // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
          // 如url="sys/user"，则组件路径应是"@/views/sys/user.vue",否则组件加载不到
          let array = menuList[i].url.split('/')
          let url = ''
          for (let i = 0; i < array.length; i++) {
            url += array[i].substring(0, 1).toUpperCase() + array[i].substring(1) + '/'
          }
          url = url.substring(0, url.length - 1)
          route['component'] = resolve => require([`@/views/${url}`], resolve)
        } catch (e) {}
      }
      routes.push(route)
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes)
  } else {
    console.log('动态路由加载...')
    console.log(routes)
    console.log('动态路由加载完成.')
  }
  return routes
}

export default router
