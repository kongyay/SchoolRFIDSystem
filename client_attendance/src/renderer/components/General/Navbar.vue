<template>
<b-navbar id="theOnlyNav" toggleable="sm" type="dark" sticky>

  <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand to="/">
  <img id='logo' src='../../assets/only-logo.png' />
  School System
  </b-navbar-brand>

  <b-collapse is-nav id="nav_collapse">

    <b-navbar-nav>
      <b-nav-item to="/">Menu</b-nav-item>
      <b-nav-item to="/attendance">Attendance</b-nav-item>
      <b-nav-item to="/payment">Payment</b-nav-item>
    </b-navbar-nav>

    <!-- Right aligned nav items -->
    <b-navbar-nav class="ml-auto">

      <b-nav-item>
        {{currentTime}}
      </b-nav-item>

      <b-nav-item>
        <b-button variant="warning" size="sm" class="my-2 my-sm-0" v-b-modal.navModal>
          <icon v-if="getReaderConnected" name="address-card-o" class="good"></icon>
          <icon v-else name="exclamation-triangle" class="bad"></icon>
          <icon name="cog"></icon>
        </b-button>
      </b-nav-item>

    </b-navbar-nav>

  </b-collapse>

  <b-modal id="navModal" title="Settings" header-bg-variant="dark" 
    header-text-variant="light" body-bg-variant="light" body-text-variant="dark"
    footer-bg-variant="light" footer-text-variant="dark" hide-footer>
    <Settings></Settings>
  </b-modal>
</b-navbar>
</template>

<script>
import { mapGetters } from 'vuex'
import Settings from './Settings.vue'
import moment from 'moment'
export default {
  data () {
    return {
      showModal: false,
      currentTime: moment().format('LTS')
    }
  },
  computed: {
    ...mapGetters(['getReaderConnected'])
  },
  components: {
    Settings
  },
  mounted: function () {
    setInterval(() => {
      this.currentTime = moment().format('LTS')
    }, 1000)
  }
}
</script>

<style scoped>
.bad {
  color: red;
}
.good {
  color: green;
}
#logo {
  width: 30px;
  height: 30px;
}
#theOnlyNav {
  background: #3a4700;
}
</style>
