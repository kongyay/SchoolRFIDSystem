<template>
  <div id="wrapper">
    <b-container>
        
        <div v-if="!isLoggedIn">
          <b-row align-v="center">
          <b-col md='3'><img id='header-logo' src="../assets/full-logo.png"></b-col>
          <b-col md='9'>
          <b-jumbotron class='jumbo' text-variant='white'>
            <template slot="header">
              School System    
            </template>
            <hr class="my-1">
            <p>
              You can contact the admin for more information
            </p>
          </b-jumbotron>
          </b-col>
          </b-row>
          <LogIn id='login'/>
        </div>
        <div v-else>
          <b-jumbotron class='jumbo2' text-variant='white'>
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
              <b-button size='sm' variant='success' to="/student_analytics">
                Attendance Analytics
              </b-button>
            </b-card>
            <b-card header="Payment System" :img-src="require('../assets/cashier.jpg')">
              <b-button size='lg' variant='warning' to="/payment">
                Cashier
              </b-button><hr>
              <b-button size='sm' variant='warning' to="/history">
                History
              </b-button>
              <b-button size='sm' variant='warning' to="/product_list">
                Product List
              </b-button>
            </b-card>
          </b-card-group>
        </div>
    </b-container>
    <div id='copyright' class="d-none d-md-block" v-b-modal.navContact>
      <img id='copyright-logo' src="../assets/only-logo.png">  FONIVA 2018 - 0 850 450 0 724
    </div>
    
    <b-modal id="navContact" title="Contacts" header-bg-variant="dark" 
      header-text-variant="light" body-bg-variant="light" body-text-variant="dark"
      footer-bg-variant="light" footer-text-variant="dark" hide-footer>
      İstanbul Office: <br>
      Büyükdere Cad. Müselles Sok. Onur İş Merkezi <br>
      No:1/1 Kat:2 34394 Esentepe Şişli / İSTANBUL <hr>
      Phone : 0 212 450 25 00 / 0 850 450 25 00 <br>
      Fax: 0 850 450 25 01 <br>
      E-Mail: mh@foniva.com.tr <br>
      Website: http://foniva.com.tr/ <br>
    </b-modal>

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

.jumbo {
  background: #62971b;
}
.jumbo2 {
  background: radial-gradient(
    ellipse at top left,
    #62971b 60%,
    rgba(172, 202, 0, 0.699) 100%
  );
}
#copyright {
  position: fixed;
  left: 50%;
  bottom: 0;
}
#copyright-logo {
  width: 20px;
  height: 20px;
}
#header-logo {
  width: 100%;
}
</style>
