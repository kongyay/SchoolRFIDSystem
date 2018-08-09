<template>
  <b-container>
        <line-chart
          :data="chartData1"
          :options="{responsive: true, maintainAspectRatio: false}"
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
      labelDate: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      startRange: new Date(new Date().setDate(new Date().getDate() - 1)),
      endRange: new Date(),

      titleTeacher: 'Attendance per teacher'
    }
  },
  computed: {
    ...mapGetters(['getStudents']),
    filteredStudents () {
      return this.getStudents.filter((s) => {
        return s.history.filter((h) => {
          return h.time >= this.startRange && h.time <= this.endRange
        }).length > 0
      })
    },
    chartData1 () {
      return {
        labels: this.studentByTeacher['datalabel'],
        datasets: [
          {
            label: 'Attendance per teacher',
            backgroundColor: '#f00',
            data: this.studentByTeacher['dataset']
          }
        ]
      }
    },
    studentByTeacher () {
      let studentGroup = this.groupStudents(this.filteredStudents, 'teacher')
      let datalabel = Object.keys(studentGroup)
      let dataset = datalabel.map((i) => {
        return studentGroup[i].length
      })

      return {dataset, datalabel}
    }
  },
  methods: {
    groupStudents (arr, prop) {
      return arr.reduce((groups, item) => {
        const val = item[prop]
        groups[val] = groups[val] || []
        groups[val].push(item)
        return groups
      }, {})
    }
  },
  filters: {

  },
  components: {
    LineChart
  }
}
</script>
