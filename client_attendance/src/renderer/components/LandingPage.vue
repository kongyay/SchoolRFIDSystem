<template>
  <div id="wrapper">
    <b-container>
        <img id="logo" src="~@/assets/School.png">
        <div v-if="!isLoggedIn"><LogIn /></div>
        <div v-else id='link-buttons' >
          <b-row>
            <router-link tag="b-button" to="/attendance">
              Attendance
            </router-link>
          </b-row>
          <b-row>
            <b-button @click="logout">Sign out</b-button>
          </b-row>
        </div>
    </b-container>
  </div>
</template>

<script>
import SystemInformation from './LandingPage/SystemInformation'
import LogIn from './LandingPage/LogIn'
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'landing-page',
  components: { SystemInformation, LogIn },
  computed: {
    ...mapGetters(['isLoggedIn'])
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
  width: 420px;
}

.link-buttons {
  width: 90%;
}
</style>
