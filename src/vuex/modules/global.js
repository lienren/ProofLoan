// 该模块的初始状态
const state = {
  direction: 'forward',
  showMask: false,
  btnLoadingStr: null,
  btnLoadingID: null,
  route: null,
  jsUrl: null // IOS微信记录第一次的URL
}
// getters
const getters = {
  route: state => {
    return state.route
  },
  btnLoading: state => {
    return {
      id: state.btnLoadingID,
      str: state.btnLoadingStr
    }
  }
}
// 相关的 mutations
const mutations = {
  UPDATE_DIRECTION (state, direction) {
    state.direction = direction
  },
  SHOW_MASK (state, showMask) {
    state.showMask = showMask
  },
  UPDATE_BTNLOADINGSTR (state, load) {
    if (load) {
      state.btnLoadingStr = load.str
      state.btnLoadingID = load.id
      state.showMask = !!load.str
    } else {
      state.btnLoadingStr = null
      state.btnLoadingID = null
      state.showMask = false
    }
  },
  SET_ROUTE (state, route) {
    state.route = route
  },
  SET_WX_JS_URL (state, url) {
    state.jsUrl = url
  }
}
export default {
  state,
  mutations,
  getters
}
