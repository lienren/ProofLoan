// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App.vue'
import { router, defaultTitle } from './router'
/**
 * sync router params
 */
import { sync } from 'vuex-router-sync'
import store from './vuex/store'
// plugins
import { AlertPlugin, ConfirmPlugin, DevicePlugin, LoadingPlugin, ConfigPlugin } from 'vux'
import VueParticles from 'vue-particles' // 粒子酷炫效果
import ToastPlugin from './plugs/toast/index'
import UtilsPlugin from './assets/utils'
import HttpPlugin from './http'
// polyfill
import './polyfill/index'

Vue.use(VueRouter)
Vue.use(VueParticles)
FastClick.attach(document.body)
let history = window.sessionStorage
history.clear()
let historyCount = history.getItem('count') * 1 || 0
history.setItem('/', 0)
let isPush = false
let endTime = Date.now()
let methods = ['push', 'go', 'replace', 'forward', 'back']
document.addEventListener('touchend', () => {
  endTime = Date.now()
})
methods.forEach(key => {
  let method = router[key].bind(router)
  router[key] = function (...args) {
    isPush = true
    method.apply(null, args)
  }
})
/**
 * sync router loading status
 */
const commit = store.commit
router.beforeEach((to, from, next) => {
  commit('SHOW_MASK', true)
  const toIndex = history.getItem(to.path)
  const fromIndex = history.getItem(from.path)
  if (toIndex) {
    if (!fromIndex || parseInt(toIndex, 10) > parseInt(fromIndex, 10) || (toIndex === '0' && fromIndex === '0')) {
      commit('UPDATE_DIRECTION', 'forward')
    } else {
      // 判断是否是ios左滑返回
      // console.log(isPush, Date.now() - endTime)
      if (!isPush && Date.now() - endTime < 377) {
        commit('UPDATE_DIRECTION', '')
      } else {
        commit('UPDATE_DIRECTION', 'reverse')
      }
    }
  } else {
    ++historyCount
    history.setItem('count', historyCount)
    to.path !== '/' && history.setItem(to.path, historyCount)
    commit('UPDATE_DIRECTION', 'forward')
  }
  /* if (Vue.$device.isWechat && !store.state.global.jsUrl) {
    // 记录第一次进入的URL
    commit('SET_WX_JS_URL', window.location.href)
  } */
  setTimeout(next, 0)
})
router.afterEach(to => {
  isPush = false
  // 设置标题
  if (to.meta.title || defaultTitle !== document.title) {
    Vue.$utils.Common.setTitle(to.meta.title || defaultTitle)
  }
  // 保存当前路由
  commit('SET_ROUTE', to)
  setTimeout(() => {
    if (!to.meta.noRouterLog) {
      // 统计
      Vue.$utils.Log.appRouter()
    }
  }, 50)
})
sync(store, router)
Vue.use(DevicePlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(UtilsPlugin)
Vue.use(ToastPlugin)
Vue.use(HttpPlugin)
Vue.use(ConfigPlugin, {
  $layout: 'VIEW_BOX'
})
// todo 加载微信sdk，如不需要可注释
/* if (Vue.$device.isWechat) {
  const script = document.createElement('script')
  script.src = '//res.wx.qq.com/open/js/jweixin-1.3.2.js'
  document.body.appendChild(script)
} */
// global
window.$globalHub = new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
