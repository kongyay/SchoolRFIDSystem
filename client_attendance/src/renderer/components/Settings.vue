<template>
    <b-container>
        <p v-if="isReaderConnected"><icon name="check-circle-o"></icon>Reader Connected</p>
        <p v-else><icon name="exclamation-circle"></icon>Reader Disconnected
        </p>
        <p>
          <b-form-checkbox id="checkbox_SMS" v-model="isSendSMS">
                            Auto-Send SMS for this student
                        </b-form-checkbox>
          <div v-if="isSendSMS">This will cost a lot...</div>
        </p>
        <b-button @click="logout">Sign out</b-button>
     </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getSendSMS', 'getReaderConnected']),
    isReaderConnected: {
      get () {
        return this.getReaderConnected
      },
      set (value) {
        this.setReaderConnected(value)
      }
    },
    isSendSMS: {
      get () {
        return this.getSendSMS
      },
      set (value) {
        this.setSendSMS(value)
      }
    }
  },
  methods: {
    ...mapActions(['setSendSMS', 'setReaderConnected', 'logout'])

  }
}
</script>
