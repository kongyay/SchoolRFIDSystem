<template>
    <div id="StudentCard" v-if="studentData">
        <div class="card hovercard" >
            <div class="card-background">
                <img class="card-bkimg" alt="" :src="studentData.pic">
                <!-- http://lorempixel.com/850/280/people/9/ -->
            </div>
            <div class="useravatar">
                <img alt="" :src="studentData.pic">
            </div>
            <div class="card-info"> <span class="card-title">{{studentData.first_name}} {{studentData.last_name}}</span>
            </div>
        </div>
        <b-tabs id='StudentTab'>
            <b-tab title="Profile" active>
                <b-row>
                    <b-col sm="5">First Name: </b-col>
                    <b-col sm="7">{{studentData.first_name}}</b-col>
                </b-row>
                <b-row>
                    <b-col sm="5">Last Name: </b-col>
                    <b-col sm="7">{{studentData.last_name}}</b-col>
                </b-row>
                <hr>
                <b-row>
                    <b-col sm="5">Grade: </b-col>
                    <b-col sm="7">{{studentData.grade}}</b-col>
                </b-row>
                <b-row>
                    <b-col sm="5">Class: </b-col>
                    <b-col sm="7">{{studentData.class}}</b-col>
                </b-row>
                <b-row>
                    <b-col sm="5">Teacher: </b-col>
                    <b-col sm="7">{{studentData.teacher}}</b-col>
                </b-row>
                <hr>
                <b-progress :max="studentHistory.length" class="mb-3">
                    <b-progress-bar variant="success" :value="presentTime.length" show-value animated></b-progress-bar>
                    <b-progress-bar variant="warning" :value="lateTime.length" show-value></b-progress-bar>
                    <b-progress-bar variant="danger" :value="absentTime.length" show-value></b-progress-bar>
                </b-progress>
            </b-tab>
            <b-tab title="History" >
              <b-form-checkbox id="checkbox_Student_History" v-model="showFirstCheck">
                  Only show first check of each day
              </b-form-checkbox>
                <b-table striped hover :items="(!showFirstCheck)? studentHistory:firstCheckHistory" :fields="['date','time','status']">
                    <template slot="date" slot-scope="data">
                        {{moment(data.item.time).format('YYYY-MM-DD')}}
                    </template>
                    <template slot="time" slot-scope="data">
                        {{moment(data.value).format('LTS')}}
                    </template>
                </b-table>
            </b-tab>
            <b-tab title="Actions">  
                <b-button @click="checkIn(studentData.id)">Manual Check</b-button>
                <b-button @click="takeLeave(studentData.id)">Take Leave</b-button>
              <hr>
              <b-form-checkbox id="checkbox_Student_SMS" v-model="isStudentSendSMS">
                            Auto-Send SMS for this student
              </b-form-checkbox>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  props: [ 'studentData' ],
  data () {
    return {
      showFirstCheck: true
    }
  },
  computed: {
    ...mapGetters(['getStudentSendSMS', 'getStudentHistory']),
    studentHistory () {
      return this.getStudentHistory(this.studentData.id)
    },
    presentTime () {
      return this.studentHistory.filter((x) => x.status === 'present')
    },
    lateTime () {
      return this.studentHistory.filter((x) => x.status === 'late')
    },
    absentTime () {
      return this.studentHistory.filter((x) => x.status === 'absent')
    },
    firstCheckHistory () {
      return this.studentHistory.filter((x) => x.checkID === 0)
    },
    isStudentSendSMS: {
      get () {
        return this.getStudentSendSMS(this.studentData.id)
      },
      set (value) {
        this.setStudentSendSMS({'id': this.studentData.id, 'bool': value})
      }
    }
  },
  methods: {
    ...mapActions([ 'checkIn', 'takeLeave', 'setStudentSendSMS' ])
  }
}
</script>

<style scoped>
#StudentCard {
  width: 100%;
}
#StudentTab {
  background-color: rgba(255, 255, 255, 0.568);
  padding: 2px;
}
/* USER PROFILE PAGE */
.card {
  margin-top: 20px;
  padding: 30px;
  background-color: rgba(214, 224, 226, 0.2);
  -webkit-border-top-left-radius: 5px;
  -moz-border-top-left-radius: 5px;
  border-top-left-radius: 5px;
  -webkit-border-top-right-radius: 5px;
  -moz-border-top-right-radius: 5px;
  border-top-right-radius: 5px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
}
.card.hovercard {
  position: relative;
  padding-top: 0;
  overflow: hidden;
  text-align: center;
  background-color: #fff;
  background-color: rgba(255, 255, 255, 1);
}
.card.hovercard .card-background {
  height: 130px;
}
.card-background img {
  -webkit-filter: blur(25px);
  -moz-filter: blur(25px);
  -o-filter: blur(25px);
  -ms-filter: blur(25px);
  filter: blur(25px);
  margin-left: -100px;
  margin-top: -200px;
  min-width: 130%;
}
.card.hovercard .useravatar {
  position: absolute;
  top: 15px;
  left: 0;
  right: 0;
}
.card.hovercard .useravatar img {
  width: 100px;
  height: 100px;
  max-width: 100px;
  max-height: 100px;
  -webkit-border-radius: 50%;
  -moz-border-radius: 50%;
  border-radius: 50%;
  border: 5px solid rgba(255, 255, 255, 0.5);
}
.card.hovercard .card-info {
  position: absolute;
  bottom: 14px;
  left: 0;
  right: 0;
}
.card.hovercard .card-info .card-title {
  padding: 0 5px;
  font-size: 20px;
  line-height: 1;
  color: #262626;
  background-color: rgba(255, 255, 255, 0.1);
  -webkit-border-radius: 4px;
  -moz-border-radius: 4px;
  border-radius: 4px;
}
.card.hovercard .card-info {
  overflow: hidden;
  font-size: 12px;
  line-height: 20px;
  color: #737373;
  text-overflow: ellipsis;
}
.card.hovercard .bottom {
  padding: 0 20px;
  margin-bottom: 17px;
}
</style>
