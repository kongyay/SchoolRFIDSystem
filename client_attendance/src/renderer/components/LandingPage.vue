<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/School.png">
    <main>
      <b-container fluid>
        <div v-if="!isLoggedIn"><LogIn /></div>
        <div v-else>
          <b-row>
            <router-link tag="b-button" to="/attendance">
              Attendance
            </router-link>
            <b-button @click="logout">Sign out</b-button>
          </b-row>
        </div>
        
        
      </b-container>
    </main>
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

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro");

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: "Source Sans Pro", sans-serif;
}

#wrapper {
  background: radial-gradient(
    ellipse at top left,
    rgb(255, 227, 194) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
  height: 100vh;
  padding: 60px 80px;
  width: 100vw;
}

#logo {
  height: auto;
  margin-bottom: 20px;
  width: 420px;
}

main {
  display: flex;
  justify-content: space-between;
  border-style: solid;
  padding: 2%;
}

main > div {
  flex-basis: 80%;
}
</style>
