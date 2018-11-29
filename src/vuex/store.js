// vuex/store.js
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import config from '../../config/index'
// 导入各个模块的初始状态和 mutations
import global from './modules/global'
import service from './modules/service'
import auth from './modules/auth'
import localStorage from '../assets/utils/localStorage'

if (process.env.NODE_ENV === 'development') {
  Vue.use(Vuex)
}
export default new Vuex.Store({
  // 组合各个模块
  modules: {
    global,
    service,
    auth
  },
  // 插件
  plugins: [
    createPersistedState({
      key: config.build.assetsPublicPath + 'vuex',
      paths: ['service', 'auth'], // 缓存模块
      getState: key => localStorage.get(key),
      setState: (key, state) => localStorage.set(key, state)
    })
  ]
})
