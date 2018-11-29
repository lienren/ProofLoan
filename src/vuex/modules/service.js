import { deepCopy } from '../../assets/utils/util'
// initial state
const state = {
  fullPath: null,
  udcid: null,
  usermob: null,
  userkey: null,
  channel: null,
  info: {}
}
const defaultValue = deepCopy(state)
// getters
const getters = {
  fullPath: state => state.fullPath,
  channel: state => state.channel,
  udcid: state => state.udcid,
  usermob: state => state.usermob,
  userkey: state => state.userkey,
  info: state => state.info
}
// actions
const actions = {}
// mutations
const mutations = {
  service_init (state) {
    for (let prop in state) {
      state[prop] = defaultValue[prop]
    }
  },
  init_param_data (state, obj) {
    state.fullPath = obj.fullPath
    state.channel = obj.channel
    state.udcid = obj.udcid
    state.usermob = obj.usermob
    state.userkey = obj.userkey
  },
  init_service_data (state, obj) {
    state.info = { ...state.info, ...obj }
  }
}
export default {
  state,
  getters,
  actions,
  mutations
}
