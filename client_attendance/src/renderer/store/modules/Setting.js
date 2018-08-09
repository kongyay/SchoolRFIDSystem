const state = {
  isSendSMS: false,
  lateTime: [{
    start: {
      HH: '6',
      mm: '00'
    },
    stop: {
      HH: '9',
      mm: '30'
    }
  }, {
    start: {
      HH: '14',
      mm: '00'
    },
    stop: {
      HH: '14',
      mm: '30'
    }
  }],
  currencyAvailable: [
    '₺', '$', '€'
  ],
  currency: '₺',

  isReaderConnected: false,
  readerData: '',
  readerVID: 65535,
  readerPID: 53
}

const mutations = {
  SET_SMS (state, bool) {
    state.isSendSMS = bool
  },
  SET_READER_CONNECTED (state, bool) {
    state.isReaderConnected = bool
  },
  SET_READER_DATA (state, data) {
    state.readerData = data
  },
  CLEAR_READER_DATA (state) {
    state.readerData = ''
  },
  SET_LATETIME (state, data) {
    state.lateTime = data
  },
  SET_CURRENCY (state, data) {
    state.currency = data
  }
}

const actions = {
  setSendSMS ({
    commit
  }, bool) {
    // do something async
    commit('SET_SMS', bool)
  },
  setReaderConnected ({
    commit
  }, bool) {
    // do something async
    commit('SET_READER_CONNECTED', bool)
  },
  setReaderData ({
    commit
  }, data) {
    // do something async
    commit('SET_READER_DATA', data)
  },
  clearReaderData ({
    commit
  }) {
    // do something async
    commit('CLEAR_READER_DATA')
  },
  setLateTime ({
    commit
  }, data) {
    // do something async
    commit('SET_LATETIME', data)
  },
  setCurrency ({
    commit
  }, data) {
    // do something async
    commit('SET_CURRENCY', data)
  }

}

const getters = {
  getSendSMS: state => state.isSendSMS,
  getLateTime: state => JSON.parse(JSON.stringify(state.lateTime)),
  getReaderConnected: state => state.isReaderConnected,
  getReaderData: state => state.readerData,
  getPID: state => state.readerPID,
  getVID: state => state.readerVID,
  getCurrency: state => state.currency,
  getCurrencyAvailable: state => state.currencyAvailable
}

export default {
  state,
  mutations,
  getters,
  actions
}
