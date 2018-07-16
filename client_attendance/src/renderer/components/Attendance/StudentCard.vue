<template>
    <div>
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
        <b-tabs>
            <b-tab title="Profile" active>
                <b-row>
                    <b-col sm="5">First Name: </b-col>
                    <b-col sm="7">{{studentData.first_name}}</b-col>
                </b-row>
                <b-row>
                    <b-col sm="5">Last Name: </b-col>
                    <b-col sm="7">{{studentData.last_name}}</b-col>
                </b-row>
                <b-progress :max="studentData.history.length" class="mb-3">
                    <b-progress-bar variant="success" :value="presentTime.length" show-value animated></b-progress-bar>
                    <b-progress-bar variant="warning" :value="lateTime.length" show-value></b-progress-bar>
                    <b-progress-bar variant="danger" :value="absentTime.length" show-value></b-progress-bar>
                </b-progress>
            </b-tab>
            <b-tab title="History" >
                <b-table striped hover :items="studentData.history" :fields="['date','time','status']">
                    <template slot="date" slot-scope="data">
                        {{moment(data.item.time).format('YYYY-MM-DD')}}
                    </template>
                    <template slot="time" slot-scope="data">
                        {{moment(data.value).format("h:mm")}}
                    </template>
                </b-table>
            </b-tab>
            <b-tab title="Actions">
                <b-button @click="checkIn(studentData.id)">Manual Check</b-button>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: [ 'studentData' ],
  computed: {
    presentTime () {
      return this.studentData.history.filter((x) => x.status === 'present')
    },
    lateTime () {
      return this.studentData.history.filter((x) => x.status === 'late')
    },
    absentTime () {
      return this.studentData.history.filter((x) => x.status === 'absent')
    }
  },
  methods: {
    ...mapActions([ 'checkIn' ])
  }
}
</script>

<style scoped>
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
