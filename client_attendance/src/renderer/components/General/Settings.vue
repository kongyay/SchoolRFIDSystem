<template>
    <b-container>
        <p v-if="isReaderConnected"><icon name="check-circle-o"></icon> Reader Connected</p>
        <p v-else><icon name="exclamation-circle"></icon>Reader Disconnected
        </p>
        <hr>
        <p>
          <b-form-checkbox id="checkbox_SMS" v-model="isSendSMS">
                            Auto-Send SMS from this computer
          </b-form-checkbox>
        </p>
        Current Check:
        <b-form-select v-model="checkID" class="mb-3">
            <option v-for="time, i in tempLateTime" :key="i" :value="i">{{time.start.HH}}:{{time.start.mm}} - {{time.stop.HH}}:{{time.stop.mm}}</option>
        </b-form-select>
        <p v-for="time, i in tempLateTime" :key="i">
          Check {{i+1}}
          <vue-timepicker v-model="tempLateTime[i].start"></vue-timepicker> - 
          <vue-timepicker v-model="tempLateTime[i].stop"></vue-timepicker> <b-button v-if="i>0" @click="tempLateTime.splice(i,1)" variant="sm">-</b-button>
        </p>
          <b-button @click="tempLateTime.push({start:{},stop:{}})" variant="sm">+</b-button>
        <hr>
        Currency
        <b-form-select v-model="currency" class="mb-2">
            <option v-for="cur, i in getCurrencyAvailable" :key="i" :value="cur">{{cur}}</option>
        </b-form-select>
        <hr>
        <b-button @click="save" variant="primary">Save</b-button>
        <b-button @click="logout" variant="sm">Sign out</b-button>
     </b-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  data: () => {
    return {
      tempLateTime: {}
    }
  },
  computed: {
    ...mapGetters(['getSendSMS', 'getReaderConnected', 'getLateTime', 'getCheckID', 'getCurrencyAvailable', 'getCurrency']),
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
    },
    checkID: {
      get () {
        return this.getCheckID
      },
      set (value) {
        this.setCheckID(value)
      }
    },
    currency: {
      get () {
        return this.getCurrency
      },
      set (value) {
        this.setCurrency(value)
      }
    }
  },
  methods: {
    ...mapActions(['setSendSMS', 'setReaderConnected', 'logout', 'setLateTime', 'setCheckID', 'setCurrency']),
    save () {
      this.setLateTime(this.$data.tempLateTime)
    }
  },
  beforeMount () {
    this.tempLateTime = this.getLateTime
  },
  watch: {
    // tempLateTime: {
    //   handler (val, oldVal) {
    //     if (oldVal.length > 0) { // not first
    //       this.setLateTime(this.save())
    //     }
    //   },
    //   deep: true

    // }
  }
}
</script>
