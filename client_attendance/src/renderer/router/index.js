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
    path: '/student_list',
    name: 'student_list',
    component: require('@/components/StudentList').default
  }, {
    path: '/product_list',
    name: 'product_list',
    component: require('@/components/ProductList').default
  },
  {
    path: '*',
    redirect: '/'
  }
  ]
})
