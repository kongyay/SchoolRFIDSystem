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
    'price': -100
  }],
  sellHistory: [{
    'id': '1',
    'buyer': '1000',
    'price': 30,
    'time': new Date('2018-07-12T07:30:00+03:00'),
    'products': [{
      'id': '2000',
      'rfid': '1999056933',
      'name': 'Snack',
      'type': 'food',
      'price': 3,
      'amount': 10
    }]
  }]
}

const mutations = {
  ADD_SELL_HISTORY (state, payload) {
    payload.id = state.sellHistory.length
    state.sellHistory.push(payload)
  }
}
const actions = {
  newBuy ({
    commit,
    dispatch
  }, payload) {
    commit('ADD_SELL_HISTORY', payload)
    var body = payload
    console.log(body)
    let prodString = ''
    payload.products.forEach(p => {
      prodString += `${p.name}\t\tx${p.amount}\n`
    })

    dispatch('addBuyHistory', payload)

    dispatch('changeBalance', {
      id: payload.buyer,
      amount: -payload.price
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
