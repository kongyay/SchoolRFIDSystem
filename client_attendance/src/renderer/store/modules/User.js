import apiUser from '@/services/api-user'

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
  async login ({
    commit
  }, creds) {
    commit('LOGIN') // show spinner
    console.log('login...', creds)
    let userData = await apiUser.getAuth(creds.username, creds.password)
    console.log(userData)
    if (userData) {
      commit('SET_USERNAME', creds.username)
      commit('LOGIN_SUCCESS', creds)
    } else {
      global.vm.$notify({
        group: 'foo',
        title: 'Error signing in',
        text: 'The username and Password combination is not correct!',
        type: 'error'
      })
    }
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
