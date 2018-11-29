import { deepCopy } from '../../assets/utils/util'

// initial state
const state = {
  authInfo: {},
  proof: {}
}

const defaultValue = deepCopy(state)

// getters
const getters = {}

// actions
const actions = {}

// mutations
const mutations = {
  AUTH_INIT (state) {
    for (let prop in state) {
      state[prop] = defaultValue[prop]
    }
  },
  SET_AUTH (state, auth) {
    state.authInfo = {...state.authInfo, ...auth}
  },
  SET_PROOF (state, proof) {
    state.proof = { ...state.proof, ...proof }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
