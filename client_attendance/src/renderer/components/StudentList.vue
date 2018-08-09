<template>
    <div class='wrapper'>
        <div><icon id="page-icon" name="user" scale=2></icon>
        <b-input type="text" id="searchField" placeholder="Search.." v-model="searchTxt" v-focus></b-input></div>
        <b-table striped hover :items="displayStudents" :fields="attFields">
            <template slot="pic" slot-scope="data">
              <img alt="" :src="data.value">
            </template>
            <template slot="edit" slot-scope="data">
              <b-button v-if="getUserRole==='admin'" size="sm" class="mr-2" @click='setModal(data.item)' v-b-modal.cardModal>
                More/Edit
              </b-button>
            </template>
        </b-table>

        <b-modal  id="cardModal" title="Student Profile" hide-footer>
          <student-card :studentData="studentData"></student-card>  
        </b-modal>

    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StudentCard from './Attendance/StudentCard'
export default {
  data () {
    return {
      searchTxt: '',
      edit_id: '',
      edit_name: '',
      edit_price: 0,
      edit_type: '',
      studentData: undefined,
      attFields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'pic',
          label: ''
        },
        {
          key: 'first_name',
          label: 'F.Name',
          sortable: true
        },
        {
          key: 'last_name',
          label: 'L.Name',
          sortable: true
        },
        {
          key: 'edit',
          label: 'Actions'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['getStudent', 'getStudents', 'getUserRole', 'getStudentByRFID', 'getReaderData']),
    displayStudents () {
      return this.getStudents.filter((e) => e.first_name.toLowerCase().match(this.searchTxt.toLowerCase()) || e.last_name.match(this.searchTxt.toLowerCase()))
    }
  },
  methods: {
    setModal (selectedStudent) {
      this.$data.studentData = selectedStudent
    }
  },
  components: {StudentCard}
}
</script>

<style scoped>
#searchField {
  width: 100%;
  margin-left: 40px;
}
#page-icon {
  position: absolute;
  float: left;
  left: 5px;
}
img {
  width: 100px;
  height: 100px;
  max-width: 100px;
  max-height: 100px;
  -webkit-border-radius: 20%;
  -moz-border-radius: 20%;
  border-radius: 20%;
  border: 5px solid rgba(255, 255, 255, 0.5);
}
</style>
