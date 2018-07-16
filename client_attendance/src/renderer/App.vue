<template>
  <div id="app">
    <Navbar v-if="isLoggedIn"></Navbar>
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
</style>
