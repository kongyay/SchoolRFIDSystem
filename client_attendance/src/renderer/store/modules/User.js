const state = {
  username: '',
  password: '',
  isLoggedIn: !!localStorage.getItem('token')
}

const mutations = {
  SET_USERNAME (state, username) {
    state.username = username
  },
  SET_PASSWORD (state, password) {
    state.username = password
  },
  LOGIN (state) {
    state.pending = true
  },
  LOGIN_SUCCESS (state) {
    state.isLoggedIn = true
    state.pending = false
  },
  LOGOUT (state) {
    state.isLoggedIn = false
  }
}

const actions = {
  login ({
    commit
  }, creds) {
    commit('LOGIN') // show spinner
    console.log('login...', creds)
    return new Promise(resolve => {
      setTimeout(() => {
        localStorage.setItem('token', 'JWT')
        commit('LOGIN_SUCCESS')
        resolve()
      }, 1000)
    })
  },
  logout ({
    commit
  }) {
    localStorage.removeItem('token')
    commit('LOGOUT')
  }
}

const getters = {
  isLoggedIn: state => {
    return state.isLoggedIn
  }
}

export default {
  state,
  mutations,
  getters,
  actions
}
