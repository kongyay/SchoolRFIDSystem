<template>
    <div class="col-lg-6 col-sm-6">
        <div class="card hovercard">
            <div class="card-background">
                <img class="card-bkimg" alt="" src="http://lorempixel.com/100/100/people/9/">
                <!-- http://lorempixel.com/850/280/people/9/ -->
            </div>
            <div class="useravatar">
                <img alt="" src="http://lorempixel.com/100/100/people/9/">
            </div>
            <div class="card-info"> <span class="card-title">Pamela Anderson</span>
            </div>
        </div>
        <b-tabs>
            <b-tab title="Profile" active>
                <br>I'm the first fading tab
            </b-tab>
            <b-tab title="History" >
                <b-table striped hover :items="getHistories"></b-table>
            </b-tab>
            <b-tab title="Actions">
                <b-button>Manual Check</b-button>
            </b-tab>
        </b-tabs>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex'
    export default {
  data () {
        return {
          electron: process.versions['atom-shell'],
          name: this.$route.name,
          node: process.versions.node,
          path: this.$route.path,
          platform: require('os').platform(),
          vue: require('vue/package.json').version
        }
  },
  computed: {
        ...mapGetters([
          'getHistories'
        ])
  }
    }
</script>

<style scoped>
/* USER PROFILE PAGE */
 .card {
    margin-top: 20px;
    padding: 30px;
    background-color: rgba(214, 224, 226, 0.2);
    -webkit-border-top-left-radius:5px;
    -moz-border-top-left-radius:5px;
    border-top-left-radius:5px;
    -webkit-border-top-right-radius:5px;
    -moz-border-top-right-radius:5px;
    border-top-right-radius:5px;
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
    padding:0 5px;
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
