<template>
  <div id="app">
    <Navbar v-if="isLoggedIn"></Navbar>
    <vue-snotify></vue-snotify>

    <router-view></router-view>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Navbar from './components/Navbar.vue'
import usbDetect from 'usb-detection'
export default {
  name: 'client_attendance',
  data () {
    return {

    }
  },
  computed: {
    ...mapGetters(['isLoggedIn', 'getVID', 'getPID'])
  },
  components: {
    Navbar
  },
  methods: {
    ...mapActions(['setReaderConnected']),
    onReaderConnect (device) {
      console.log('Reader connected !')
      this.setReaderConnected(true)
    },
    onReaderDisconnect (device) {
      console.log('Reader was removed !')
      this.setReaderConnected(false)
    }
  },
  created () {
    usbDetect.find(this.getVID, this.getPID, (err, devices) => {
      if (devices.length > 0) { this.onReaderConnect() } else { alert('Reader is not found: ' + err) }
    })
    usbDetect.startMonitoring()
    usbDetect.on(`add:${this.getVID}:${this.getPID}`, this.onReaderConnect)
    usbDetect.on(`remove:${this.getVID}:${this.getPID}`, this.onReaderDisconnect)
  },
  beforeDestroy () {

  }
}
</script>

<style>
/* CSS */

body,
html {
  font-family: "Source Sans Pro", sans-serif;
  height: 100%;
}

#app {
  overflow: hidden;
  height: 100%;
}

#wrapper {
  padding: 30px 40px;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    ellipse at top left,
    rgb(255, 238, 219) 40%,
    rgba(229, 229, 229, 0.9) 100%
  );
}
</style>
