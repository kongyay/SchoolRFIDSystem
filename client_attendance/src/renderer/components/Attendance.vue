<template>
<div class="attendance_page">
    <b-row>
        <b-col sm="6">
          <input id="readerField" type="number" style="hidden:false" 
                        v-model="inputData" autofocus placeholder="Use Reader / Enter ID"
                        @keyup="onKeyboardInput" @blur="onBlurInput" ></input>
            <b-table striped hover :items="getAttTable" :fields="attFields" v-on:row-hovered="rowHover">
                <template slot="time" slot-scope="data">
                {{moment(data.value).format('h:mm')}}
                </template>
            </b-table>
        </b-col>
        <b-col sm="6" v-if="studentData!==undefined">
            <StudentCard :studentData="studentData"/>
        </b-col>
    </b-row>
 </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import StudentCard from './Attendance/StudentCard'
export default {
  data () {
    return {
      studentData: undefined,
      inputData: '',
      attFields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'time',
          label: 'Att. Time',
          sortable: true
        },
        {
          key: 'status',
          label: 'Status',
          sortable: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getAttTable', 'getStudent', 'getStudentByRFID', 'getSendSMS', 'getReaderData']),
    focused () {
      return document.activeElement
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
    ...mapActions(['checkIn', 'setSendSMS', 'setReaderData']),
    rowHover (item, index, event) {
      this.studentData = this.getStudent(item.id)
    },
    onKeyboardInput (e) {
      if (this.inputData.length > 9) {
        this.setReaderData(this.inputData)
        this.inputData = ''
        alert(this.getReaderData)
      }
    },
    onBlurInput (e) {
      if (this.focused != null) {
        e.target.focus()
      }
    }
  },
  watch: {
    getReaderData () {
      var student = this.getStudentByRFID(this.getReaderData)
      if (student) {
        this.checkIn(student.id)
      } else {
        alert('No Student:' + this.getReaderData)
      }
    }
  },
  components: {StudentCard}
}
</script>

<style scoped>
#readerField {
  width: 100%;
}
</style>