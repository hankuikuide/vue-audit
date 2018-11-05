import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status: [{
      value: 1,
      text: '进行中'
    }, {
      value: 2,
      text: '已完成'
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

  }
})
