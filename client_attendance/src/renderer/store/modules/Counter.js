const state = {
  main: 0
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  }
}

const actions = {
  increment ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  decrement ({ commit }) {
    // do something async
    commit('DECREMENT_MAIN_COUNTER')
  }
}

const getters = {
  getCounter: state => state.main
}

export default {
  state,
  mutations,
  getters,
  actions
}
