<template>
<div id="wrapper">
    <notifications position="top center" group="att" />
    <b-row>
        <b-col sm="6">
          <b-row>
            <icon id="page-icon" name="check-square-o" scale=2></icon>
            <input id="readerField" type="number" style="hidden:false" 
                        v-model="inputData" v-focus :placeholder="!useID ? 'Use Reader / Enter RFID' : 'Enter Student ID'"
                        @keyup="onKeyboardInput" @blur="onBlurInput" />
            &thinsp;&thinsp;&thinsp;
            <b-form-checkbox id="checkbox_ID" v-model="useID">
                Use Student ID instead
            </b-form-checkbox>
          </b-row>
          
          <b-tabs>
            <b-tab title="Today" active>
              <b-table striped hover :items="getAttTable" :fields="attFields" v-on:row-hovered="rowHover">
                  <template slot="time" slot-scope="data">
                  {{moment(data.value).format('LTS')}}
                  </template>
              </b-table>
            </b-tab>
            <b-tab v-for="(check,i) in getLateTime" :key="i" :title="'Check'+ (i+1)">
              <b-table striped hover :items="attTableFilter(i)" :fields="attFields" v-on:row-hovered="rowHover">
                  <template slot="time" slot-scope="data">
                  {{moment(data.value).format('LTS')}}
                  </template>
              </b-table>
            </b-tab>
            <b-tab title="All">
              <b-table striped hover :items="getStudents" :fields="attFields" v-on:row-hovered="rowHover">
                  <template slot="time" slot-scope="data">
                  {{  data.item.today && data.item.today.status === 'present' ? moment(data.item.today.time).format('LTS') : '-' }}
                  </template>
                  <template slot="status" slot-scope="data">
                  {{ data.item.today && data.item.today.status  }}
                  </template>
              </b-table>
            </b-tab>
          </b-tabs>
          
        </b-col>
        <b-col sm="6" >
            <AttendanceAnalytics ref='analytics' class='analytics'></AttendanceAnalytics>
            <StudentCard v-if="studentData" :studentData="studentData"/>
        </b-col>
    </b-row>
 </div>
</template>


<script>
import { mapGetters, mapActions } from 'vuex'
import StudentCard from './Attendance/StudentCard'
import AttendanceAnalytics from './AttendanceAnalytics'
export default {
  name: 'Attendance',
  data () {
    return {
      today: new Date(),
      studentData: undefined,
      inputData: '',
      useID: false,
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
    ...mapGetters(['getAttTable', 'getStudent', 'getStudents', 'getStudentByRFID', 'getSendSMS', 'getReaderData', 'getLateTime']),
    focused () {
      return document.activeElement
    }
  },
  methods: {
    ...mapActions(['checkIn', 'setSendSMS', 'setReaderData', 'clearReaderData']),
    isToday (day) {
      return global.vm.moment(day).startOf('day').isSame(global.vm.moment(this.today).startOf('day'))
    },
    attTableFilter (checkID) {
      return this.getAttTable.filter(a => a.checkID === checkID)
    },
    rowHover (item, index, event) {
      this.studentData = this.getStudent(item.id)
    },
    onKeyboardInput (e) {
      if (!this.useID) {
        if (this.inputData.length < 10) return
      } else {
        if (this.inputData.length < 4) return
      }
      this.setReaderData(this.inputData)
      this.inputData = ''
    },
    onBlurInput (e) {
      if (this.focused != null) {
        e.target.focus()
      }
    }
  },
  watch: {
    getReaderData () {
      let student = null
      if (!this.useID) {
        if (this.getReaderData.length < 10) return
        student = this.getStudentByRFID(this.getReaderData)
      } else {
        if (this.getReaderData.length < 4) return
        student = this.getStudent(this.getReaderData)
      }

      if (student) {
        this.checkIn(student.id)
        this.$refs.analytics.reGraph()
      } else {
        this.$notify({
          group: 'foo',
          type: 'error',
          title: `No Student with ID ${this.getReaderData}`
        })
      }
      this.clearReaderData()
    }
  },
  components: {StudentCard, AttendanceAnalytics}
}
</script>

<style scoped>
#readerField {
  width: 100%;
  margin-left: 40px;
}
#page-icon {
  position: absolute;
  float: left;
}
.analytics {
  background-color: rgba(255, 255, 255, 0.616);
}
</style>