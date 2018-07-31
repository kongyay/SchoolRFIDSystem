const state = {
  students: [{
    'id': '1000',
    'rfid': '1580079680',
    'first_name': 'AAA',
    'last_name': 'aaa',
    'balance': 100,
    'isSendSMS': true,
    'pic': 'https://placeimg.com/100/100/people',
    'history': [{
      'time': new Date('2018-07-09T09:00:00+03:00'),
      'status': 'late'
    }, {
      'time': new Date('2018-07-10T07:00:00+03:00'),
      'status': 'present'
    }, {
      'time': new Date('2018-07-11T08:00:00+03:00'),
      'status': 'absent'
    }]
  }, {
    'id': '1001',
    'rfid': '0030272016',
    'first_name': 'BBB',
    'last_name': 'bbb',
    'balance': 50,
    'isSendSMS': false,
    'pic': 'https://placeimg.com/150/150/people',
    'history': [{
      'id': '1001',
      'time': new Date('2018-07-12T09:30:00+03:00'),
      'status': 'late'
    }]
  }],
  attTable: []
}

const mutations = {
  CHECK_IN (state, {
    index,
    newObj
  }) {
    let cs = state.students[index]
    cs.today = newObj
    cs.history.push(newObj)
    state.attTable.push(newObj)
  },
  CHANGE_BALANCE (state, {
    id,
    amount
  }) {
    let cs = state.students.find((s) => s.id === id)
    cs.balance += amount
  },
  SET_ISSEND_SMS (state, {
    id,
    bool
  }) {
    let cs = state.students.find((s) => s.id === id)
    cs.isSendSMS = bool
  }
}

const actions = {
  checkIn ({
    commit,
    rootGetters
  }, id) {
    let studentP = state.students.reduce((sum, s) => (s.today && s.today.status === 'present') ? sum + 1 : sum, 0)
    let studentA = state.students.length - studentP
    let index = state.students.findIndex((s) => s.id === id)
    if (state.students[index].today) {
      global.vm.$notify({
        group: 'att',
        type: 'error',
        duration: 1000,
        title: `[${id}] is either already in school or taking leave today`,
        text: `Present: ${studentP} | Absent: ${studentA}`
      })
      return
    }

    let currentTime = new Date()
    let newObj = {
      'id': id,
      'time': currentTime,
      'status': 'present'
    }

    if (currentTime.getHours() > parseInt(rootGetters.getLateTime.HH) &&
      currentTime.getMinutes() > parseInt(rootGetters.getLateTime.mm)) {
      newObj.status = 'late'
    }

    global.vm.$notify({
      group: 'att',
      duration: 1000,
      title: `[${id}] is present`,
      text: `Present: ${studentP + 1} | Absent: ${studentA - 1}`
    })

    commit('CHECK_IN', {
      index,
      newObj
    })
  },
  changeBalance ({
    commit
  }, payload) {
    commit('CHANGE_BALANCE', payload)
  },
  setStudentSendSMS ({
    commit
  }, payload) {
    commit('SET_ISSEND_SMS', payload)
  }
}

const getters = {
  getStudents: state => state.students,
  getAttTable: state => state.attTable,
  getStudent: state => id => state.students.find((s) => s.id === id),
  getStudentByRFID: state => rfid => state.students.find((s) => s.rfid === rfid),
  getStudentSendSMS: state => id => state.students.find((s) => s.id === id).isSendSMS
}

export default {
  state,
  mutations,
  getters,
  actions
}
