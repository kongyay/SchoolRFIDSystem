import {
  SMS
} from '../../services/SMS'
const state = {
  students: [{
    'id': '1000',
    'rfid': '1580079680',
    'first_name': 'AAA',
    'last_name': 'aaa',
    'parentTel': '5541415984',
    'grade': 3,
    'class': 'A',
    'teacher': 'XXX',
    'balance': 100,
    'allowance': 10,
    'allowanceLeft': 10,
    'isSendSMS': true,
    'pic': 'https://placeimg.com/100/100/people',
    'buyHistory': []
  }, {
    'id': '1001',
    'rfid': '0030272016',
    'first_name': 'BBB',
    'last_name': 'bbb',
    'parentTel': '5541415984',
    'grade': 4,
    'class': 'B',
    'teacher': 'YYY',
    'balance': 50,
    'allowance': 10,
    'allowanceLeft': 10,
    'isSendSMS': false,
    'pic': 'https://placeimg.com/150/150/people',
    'buyHistory': []
  }],
  attTable: [{
    'id': '1000',
    'time': new Date('2018-07-09T09:00:00+03:00'),
    'checkID': 0,
    'status': 'late'
  }, {
    'id': '1000',
    'time': new Date('2018-07-10T07:00:00+03:00'),
    'checkID': 1,
    'status': 'present'
  }, {
    'id': '1000',
    'time': new Date('2018-07-11T08:00:00+03:00'),
    'checkID': 0,
    'status': 'absent'
  }, {
    'id': '1001',
    'time': new Date('2018-07-12T09:30:00+03:00'),
    'checkID': 1,
    'status': 'late'
  }],
  checkID: 0
}

const mutations = {
  CHECK_IN (state, {
    index,
    newObj
  }) {
    let cs = state.students[index]
    cs.today = newObj
    state.attTable.push(newObj)
  },
  CHANGE_BALANCE (state, {
    id,
    amount
  }) {
    let cs = state.students.find((s) => s.id === id)
    cs.balance += amount
    cs.allowanceLeft += amount
  },
  SET_ISSEND_SMS (state, {
    id,
    bool
  }) {
    let cs = state.students.find((s) => s.id === id)
    cs.isSendSMS = bool
  },
  SET_CHECK_ID (state, id) {
    state.checkID = id
  },
  ADD_BUY_HISTORY (state, data) {
    let cs = state.students.find((s) => s.id === data.buyer)
    cs.buyHistory.push(data)
  }
}
const actions = {
  async checkIn ({
    commit,
    rootGetters
  },
  id) {
    let studentP = state.students.reduce((sum, s) => (s.today && (s.today.status === 'present' || s.today.status === 'late')) ? sum + 1 : sum, 0)
    let studentA = state.students.length - studentP
    let index = state.students.findIndex((s) => s.id === id)

    // if student has any status today
    if (state.students[index].today) {
      // if student takes leave or already checked this time
      if (state.students[index].today.status === 'leave' ||
        (state.students[index].today.checkID === state.checkID)) {
        global.vm.$notify({
          group: 'att',
          type: 'error',
          duration: 1000,
          title: `[${id}] is either already in checked or taking leave today`,
          text: `Present: ${studentP} | Absent: ${studentA}`
        })
        return
      }
    }

    let currentTime = new Date()
    let newObj = {
      'id': id,
      'time': currentTime,
      'status': 'present',
      'checkID': state.checkID
    }

    let start = rootGetters.getLateTime[rootGetters.getCheckID].start
    let stop = rootGetters.getLateTime[rootGetters.getCheckID].stop

    // If too early
    if (currentTime.getHours() < parseInt(start.HH) ||
      (currentTime.getHours() === parseInt(start.HH) && currentTime.getMinutes() < parseInt(start.mm))) {
      global.vm.$notify({
        group: 'att',
        type: 'error',
        duration: 1000,
        title: `Current time is too early to check`,
        text: `Present: ${studentP} | Absent: ${studentA}`
      })
      return
    }
    // If too late...
    if (currentTime.getHours() > parseInt(stop.HH) ||
      (currentTime.getHours() === parseInt(stop.HH) && currentTime.getMinutes() > parseInt(stop.mm))) {
      newObj.status = 'late'
    }

    global.vm.$notify({
      group: 'att',
      duration: 1000,
      title: `[${id}] is present`,
      text: `Present: ${studentP + 1} | Absent: ${studentA - 1}`
    })

    if (rootGetters.getSendSMS) {
      let res = await SMS.send(`PRESENT: ${state.students[index].first_name} (${id}) has arrived school at ${currentTime.toLocaleTimeString()}.`, state.students[index].parentTel)
      console.log(res)
    }

    commit('CHECK_IN', {
      index,
      newObj
    })
  },
  takeLeave ({
    commit
  }, id) {
    let index = state.students.findIndex((s) => s.id === id)
    if (state.students[index].today) {
      global.vm.$notify({
        group: 'att',
        type: 'error',
        duration: 1000,
        title: `[${id}] is either already in school or taking leave today`
      })
      return
    }

    let newObj = {
      'id': id,
      'time': new Date(),
      'status': 'leave'
    }

    global.vm.$notify({
      group: 'att',
      duration: 1000,
      title: `[${id}] is taking leave today`
    })

    commit('CHECK_IN', {
      index,
      newObj
    })
  },
  async changeBalance ({
    commit,
    rootGetters
  }, payload) {
    let cs = state.students.find((s) => s.id === payload.id)
    commit('CHANGE_BALANCE', payload)
    // Pay more than allowance
    if (cs.allowanceLeft + payload.amount <= 0) {
      if (rootGetters.getSendSMS) {
        let res = await SMS.send(`WARNING: ${cs.first_name} (${cs.id}) has exceeded the allowance of today. (${cs.allowanceLeft}/${cs.allowance})`, cs.parentTel)
        console.log(res)
      }
    }
  },
  addBuyHistory ({
    commit
  }, payload) {
    commit('ADD_BUY_HISTORY', payload)
  },
  setStudentSendSMS ({
    commit
  }, payload) {
    commit('SET_ISSEND_SMS', payload)
  },
  setCheckID ({
    commit
  }, payload) {
    commit('SET_CHECK_ID', payload)
  }
}

const getters = {
  getStudents: state => state.students,
  getAttTable: state => state.attTable,
  getStudent: state => id => state.students.find((s) => s.id === id),
  getStudentByRFID: state => rfid => state.students.find((s) => s.rfid === rfid),
  getStudentSendSMS: state => id => state.students.find((s) => s.id === id).isSendSMS,
  getCheckID: state => state.checkID,
  getStudentHistory: state => id => state.attTable.filter((a) => a.id === id)
}

export default {
  state,
  mutations,
  getters,
  actions
}
