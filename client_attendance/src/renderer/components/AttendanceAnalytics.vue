<template>
  <b-container>
    <b-row class="settingZone">
      <b-col>
        Grouping
        <b-form-select v-model="groupBy" size="sm" @input='reGraph()'>
          <option value="teacher">By teacher</option>
          <option value="day">By day</option>
          <option value="class">By class</option>
          <option value="grade">By grade</option>
        </b-form-select>
        Status
        <b-form-select v-model="showValue" size="sm" @input='reGraph()'>
          <option :value="['present','late','absent','leave']">Show All</option>
          <option :value="['present']">Presence Only</option>
          <option :value="['absent']">Absence Only</option>
          <option :value="['late']">Late Only</option>
          <option :value="['leave']">Leave Only</option>
        </b-form-select>
      </b-col>
      <b-col>
        Date Range
          <v2-datepicker-range v-model='dateRange' lang="en" format="MM/DD/YYYY" @change='reGraph()'></v2-datepicker-range>
        Time Range
         <b-form-select v-model="checkID" class="mb-3" size="sm" @input='reGraph()'>
            <option v-for="time, i in getLateTime" :key="i" :value="i">{{time.start.HH}}:{{time.start.mm}} - {{time.stop.HH}}:{{time.stop.mm}}</option>
        </b-form-select>
      </b-col>
      <b-col>
         <b-form-checkbox id="checkbox_Student_SMS" v-model="isCountUnique" @change='reGraph()'>
            Count 1 for each student
          </b-form-checkbox>
      </b-col>
    </b-row>
        
        
          <line-chart
          :chart-data="chartData1"
          :options="chartOption1"
          :width="400"
          :height="200"
          >
        </line-chart>
  </b-container>
</template>


<script>
import LineChart from './../services/LineChart.js'
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      groupBy: 'day',
      dateRange: [new Date().setDate(new Date().getDate() - 30), new Date()],
      checkID: 0,
      isCountUnique: false,
      showValue: ['present', 'late', 'absent', 'leave'],
      chartData1: null,
      chartOption1: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          yAxes: [{
            ticks: {
              min: 0,
              stepValue: 1
            }
          }]
        }
      }
    }
  },
  computed: {
    ...mapGetters(['getLateTime', 'getAttTable', 'getStudent']),
    filteredAtt () {
      let filtered = this.getAttTable.filter((h) => {
        return this.moment(h.time).startOf('day') >= this.dateRange[0] && this.moment(h.time).startOf('day') <= this.dateRange[1] && h.checkID === this.checkID
      })
      if (this.isCountUnique) {
        filtered = this._.uniqBy(filtered, (h) => h.id)
      }
      filtered = filtered.filter((h) => this.showValue.indexOf(h.status) > -1)
      return filtered
    }
  },
  methods: {
    studentByProps (props) {
      let studentGroup = this._.countBy(this.filteredAtt, (s) => this.getStudent(s.id)[props])
      let datalabel = Object.keys(studentGroup)
      let dataset = datalabel.map((i) => studentGroup[i])

      return {dataset, datalabel}
    },
    studentByDay () {
      let studentGroup = this._.countBy(this.filteredAtt, (s) => this.moment(s.time).format('dddd'))
      let datalabel = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
      let dataset = datalabel.map((i) => studentGroup[i] || 0)

      // console.log(dataset, datalabel)
      return {dataset, datalabel}
    },
    reGraph () {
      console.log('Re-rendering graph...', this.groupBy)

      if (this.groupBy === 'day') {
        let {dataset, datalabel} = this.studentByDay()
        this.chartData1 = {
          labels: datalabel,
          datasets: [
            {
              label: 'Student',
              backgroundColor: '#f00',
              data: dataset
            }
          ]
        }
      } else {
        let {dataset, datalabel} = this.studentByProps(this.groupBy)
        this.chartData1 = {
          labels: datalabel,
          datasets: [
            {
              label: 'Student',
              backgroundColor: '#f00',
              data: dataset
            }
          ]
        }
      }
    }
  },
  mounted () {
    this.reGraph()
  },
  filters: {

  },
  components: {
    LineChart
  }
}
</script>

<style scoped>
.settingZone {
  padding-top: 10px;
}
</style>

