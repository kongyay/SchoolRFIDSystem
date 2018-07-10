const state = {
  histories: [{
    isActive: true,
    age: 40,
    first_name: 'Dickerson',
    last_name: 'Macdonald'
  },
  {
    isActive: false,
    age: 21,
    first_name: 'Larsen',
    last_name: 'Shaw'
  },
  {
    isActive: false,
    age: 89,
    first_name: 'Geneva',
    last_name: 'Wilson'
  },
  {
    isActive: true,
    age: 38,
    first_name: 'Jami',
    last_name: 'Carney'
  }
  ]
}

const mutations = {
  SET_HISTORY (state, histories) {
    state.histories = histories
  }
}

const actions = {
  fetchHistory ({ commit }) {
    // do something async
    var items = []
    commit('SET_HISTORY', items)
  }
}

const getters = {
  getHistories: state => state.histories
}

export default {
  state,
  mutations,
  getters,
  actions
}
