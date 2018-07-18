/* eslint-disable no-unused-vars */
import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'

import moment from 'moment'
import axios from 'axios'
import Notifications from 'vue-notification'

Vue.use(Notifications)

Vue.use(BootstrapVue)
Vue.component('icon', Icon)

Vue.prototype.moment = moment
Vue.http = Vue.prototype.$http = axios

if (!process.env.IS_WEB) Vue.use(require('vue-electron'))

Vue.config.productionTip = false

/* eslint-disable no-new */
global.vm = new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app')
