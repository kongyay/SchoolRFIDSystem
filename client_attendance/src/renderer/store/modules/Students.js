const state = {
  students: [{
    'id': '1000',
    'rfid': '1999056933',
    'first_name': 'AAA',
    'last_name': 'aaa',
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
    'rfid': '0000000000000',
    'first_name': 'BBB',
    'last_name': 'bbb',
    'pic': 'https://placeimg.com/150/150/people',
    'history': []
  }],
  attTable: [{
    'id': '1000',
    'time': new Date('2018-07-12T07:30:00+03:00'),
    'status': 'present'
  }, {
    'id': '1001',
    'time': new Date('2018-07-12T09:30:00+03:00'),
    'status': 'late'
  }]
}

const mutations = {
  SET_HISTORY (state, histories) {
    state.histories = histories
  },
  CHECK_IN (state, id) {
    let cs = state.students.find((s) => s.id === id)
    cs.history.push({
      'time': new Date(),
      'status': 'present'
    })
    state.attTable.push({
      'id': id,
      'time': new Date(),
      'status': 'present'
    })
  }
}

const actions = {
  fetchHistory ({
    commit
  }) {
    // do something async
    var items = []
    commit('SET_HISTORY', items)
  },
  checkIn ({
    commit
  }, payload) {
    commit('CHECK_IN', payload)
  }
}

const getters = {
  getStudents: state => state.students,
  getAttTable: state => state.attTable,
  getStudent: state => id => state.students.find((s) => s.id === id),
  getStudentByRFID: state => rfid => state.students.find((s) => s.rfid === rfid)
}

export default {
  state,
  mutations,
  getters,
  actions
}
