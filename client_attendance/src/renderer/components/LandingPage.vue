<template>
  <div id="wrapper">
    <b-container>
        
        <div v-if="!isLoggedIn">
          <b-jumbotron>
            <template slot="header">
              School System
            </template>
            <hr class="my-1">
            <p>
              You can contact the admin for more information
            </p>
          </b-jumbotron>
          <LogIn />
        </div>
        <div v-else>
          <b-jumbotron>
            <template slot="header">
              Welcome {{getUsername}}
            </template>
            <hr class="my-1">
            <p>
              This software is still in development and should be considered as a prototype....
            </p>
          </b-jumbotron>
          <b-card-group deck class="mb-3">
            <b-card header="Attendance System" :img-src="require('../assets/checklist.png')">
              <b-button size='lg' variant='success' to="/attendance">
                Attendance
              </b-button><hr>
              <b-button size='sm' variant='success' to="/student_list">
                Student List
              </b-button>
            </b-card>
            <b-card header="Payment System" :img-src="require('../assets/cashier.jpg')">
              <b-button size='lg' variant='primary' to="/payment">
                Cashier
              </b-button><hr>
              <b-button size='sm' variant='primary' to="/history">
                History
              </b-button>
              <b-button size='sm' variant='primary' to="/product_list">
                Product List
              </b-button>
            </b-card>
          </b-card-group>
          
        </div>
    </b-container>
  </div>
</template>

<script>
import SystemInformation from './LandingPage/SystemInformation'
import LogIn from './LandingPage/LogIn'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'Menu',
  components: { SystemInformation, LogIn },
  computed: {
    ...mapGetters(['isLoggedIn', 'getUsername'])
  },
  methods: {
    open (link) {
      this.$electron.shell.openExternal(link)
    },
    ...mapActions(['logout'])
  }
}
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  align-content: center;
}

#wrapper {
  display: flex;
  justify-content: center;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 50%;
  align-self: center;
}
</style>
