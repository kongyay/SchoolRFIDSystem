<template>
    <b-form @submit.prevent="pressLogin">
        <b-row>
            <b-col sm="3"><label for="form-username">Username:</label></b-col>
            <b-col sm="9"><b-form-input v-model="username" id="form-username" type="text" autofocus></b-form-input></b-col>
        </b-row>
        <b-row>
            <b-col sm="3"><label for="form-password">Password:</label></b-col>
            <b-col sm="9"><b-form-input v-model="password" id="form-password" type="password"></b-form-input></b-col>
        </b-row>

      <b-button :disabled="username===''||password===''" type="submit" variant="primary">Sign in</b-button>
    </b-form>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  computed: {

  },
  methods: {
    ...mapActions(['login']),
    pressLogin () {
      this.login({
        'username': this.username, 'password': this.password
      })
      this.$forceUpdate()
    }
  }
}
</script>