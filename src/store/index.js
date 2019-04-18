import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存token  存到localStorage中一样
    token: window.sessionStorage.getItem('token'),
    navTree: [], // 导航菜单树
    menuRouteLoaded: false, // 菜单和路由是否已经加载
    status: [{
      value: 1,
      text: '启用'
    }, {
      value: 2,
      text: '禁用'
    }],
    recipes: [{
      value: '选项1',
      label: '黄金糕'
    }, {
      value: '选项2',
      label: '双皮奶'
    }, {
      value: '选项3',
      label: '蚵仔煎'
    }, {
      value: '选项4',
      label: '龙须面'
    }, {
      value: '选项5',
      label: '北京烤鸭'
    }]
  },
  getters: {
    formatState: (state) => (value) => {
      return state.status.find(v => v.value === value).text
    }
  },
  mutations: {
    LOGIN: (state, data) => {
      // 更改token的值
      state.token = data
      // console.log(data)
      window.sessionStorage.setItem('token', data)
    },
    setNavTree (state, navTree) { // 设置导航菜单树
      state.navTree = navTree
    },
    // 改变菜单和路由的加载状态
    menuRouteLoaded (state, menuRouteLoaded) {
      state.menuRouteLoaded = menuRouteLoaded
    }
  }
})
