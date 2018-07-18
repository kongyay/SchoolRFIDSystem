const state = {
  products: [{
    'id': '2000',
    'rfid': '1999056933',
    'name': 'Snack',
    'type': 'food',
    'price': 3
  }, {
    'id': '2001',
    'rfid': '1111111111',
    'name': 'Drink',
    'type': 'food',
    'price': 3
  }, {
    'id': '9999',
    'rfid': '0000000000',
    'name': 'Top-up card',
    'type': 'topup',
    'price': 100
  }],
  sellHistory: [{
    'id': '1',
    'buyer': '1000',
    'price': 30,
    'time': new Date('2018-07-12T07:30:00+03:00'),
    'products': [{
      'id': '2000',
      'amount': 10
    }]
  }]
}

const mutations = {
  NEW_BUY (state, payload) {

  }
}
const actions = {
  newBuy ({
    commit
  }, payload) {
    commit('NEW_BUY', payload)
    var body = payload
    console.log(body)
    let prodString = ''
    payload.products.forEach(p => {
      prodString += `${p.name}\t\tx${p.amount}\n`
    })

    global.vm.$notify({
      group: 'buy',
      title: `[${payload.buyer}] spent [${payload.price} TL]`,
      text: prodString
    })
  }
}

const getters = {
  getProducts: state => state.products,
  getProduct: state => id => state.products.find((s) => s.id === id),
  getProductByRFID: state => rfid => state.products.find((s) => s.rfid === rfid),
  getSellHistory: state => state.sellHistory
}

export default {
  state,
  mutations,
  getters,
  actions
}
