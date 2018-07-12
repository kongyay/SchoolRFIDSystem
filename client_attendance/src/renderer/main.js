/* eslint-disable no-unused-vars */
import Vue from 'vue'
import axios from 'axios'
import moment from 'moment'

import $ from 'jquery'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import App from './App'
import router from './router'
import store from './store'

Vue.use(BootstrapVue)
Vue.prototype.moment = moment

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.http = Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
