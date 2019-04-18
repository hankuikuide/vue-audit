import {
  getRequest
} from '../api/request'

export const initMenu = (router, store) => {
  if (store.state.routes.length > 0) {
    return
  }
  getRequest('/config/sysmenu').then(resp => {
    if (resp && resp.status === 200) {
      var fmtRoutes = formatRoutes(resp.data.data)
      console.dir(fmtRoutes)

      router.addRoutes(fmtRoutes)

      console.dir(router)
      store.commit('initMenu', fmtRoutes)
      // store.dispatch('connect')
    }
  })
}

export const formatRoutes = (routes) => {
  let fmRoutes = []
  routes.forEach(router => {
    let {
      path,
      // component,
      name,
      // meta,
      iconCls
      // children
    } = router
    // if (children && children instanceof Array) {
    //   children = formatRoutes(children)
    // }
    let fmRouter = {
      path: path,
      component: resolve => require(['../views/Home.vue'], resolve),
      // component (resolve) {
      //   if (component.startsWith('Home')) {
      //     require(['../views/' + component + '.vue'], resolve)
      //   } else if (component.startsWith('Emp')) {
      //     require(['../views/sys/' + component + '.vue'], resolve)
      //   } else if (component.startsWith('Per')) {
      //     require(['../views/sys/' + component + '.vue'], resolve)
      //   }
      // },
      name: name,
      iconCls: iconCls,
      // meta: meta,
      children: [{
        path: '/dropdowntree',
        component: resolve => require(['../views/sys/UserManager.vue'], resolve),
        name: '用户管理1'
      }, {
        path: '/dropdowntable',
        component: resolve => require(['../views/sys/UserManager.vue'], resolve),
        name: '角色管理1'
      }]
    }
    fmRoutes.push(fmRouter)
  })
  return fmRoutes
}
