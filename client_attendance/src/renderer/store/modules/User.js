const state = {
  isLoggedIn: this.username !== '',
  username: ''
}

const mutations = {
  SET_USERNAME (state, username) {
    state.username = username
  },
  LOGIN (state) {
    state.pending = true
    global.vm.$notify({
      group: 'foo',
      type: 'warn',
      duration: -1,
      title: `Signing in....`
    })
  },
  LOGIN_SUCCESS (state) {
    state.isLoggedIn = true
    state.pending = false
    global.vm.$notify({
      group: 'foo',
      clean: true
    })
    global.vm.$notify({
      group: 'foo',
      type: 'success',
      duration: 2000,
      title: `Signed in!`
    })
  },
  LOGOUT (state) {
    state.isLoggedIn = false
    global.vm.$notify({
      group: 'foo',
      type: 'error',
      duration: 2000,
      title: `Signed out!`
    })
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
        // localStorage.setItem('token', creds.username)
        commit('SET_USERNAME', creds.username)
        commit('LOGIN_SUCCESS', creds)
        resolve()
      }, 1000)
    })
  },
  logout ({
    commit
  }) {
    // localStorage.removeItem('token')
    commit('SET_USERNAME', '')
    global.vm.$router.push('/')
    commit('LOGOUT')
  }
}

const getters = {
  isLoggedIn: state => state.isLoggedIn,
  getUsername: state => state.username
}

export default {
  state,
  mutations,
  getters,
  actions
}
