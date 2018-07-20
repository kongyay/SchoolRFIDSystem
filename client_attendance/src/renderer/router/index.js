import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'landing-page',
    component: require('@/components/LandingPage').default
  },
  {
    path: '/attendance',
    name: 'attendance',
    component: require('@/components/Attendance').default
  }, {
    path: '/payment',
    name: 'payment',
    component: require('@/components/Payment').default
  }, {
    path: '/history',
    name: 'histpry',
    component: require('@/components/HistoryTable').default
  }, {
    path: '/settings',
    name: 'settings',
    component: require('@/components/Settings').default
  },
  {
    path: '*',
    redirect: '/'
  }
  ]
})
