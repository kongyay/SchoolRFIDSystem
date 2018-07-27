<template>
    <div class='wrapper'>
        <icon id="page-icon" name="user" scale=2></icon>
        <b-input type="text" id="searchField" placeholder="Search.." v-model="searchTxt" v-focus></b-input>
        <b-table striped hover :items="displayStudents" :fields="attFields" v-on:row-hovered="rowHover">
            <template slot="pic" slot-scope="data">
              <img alt="" :src="data.value">
            </template>
            <template slot="edit" slot-scope="data">
              <b-button size="sm" @click="" class="mr-2">
                Edit
              </b-button>
            </template>
        </b-table>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
import StudentCard from './Attendance/StudentCard'
export default {
  data () {
    return {
      searchTxt: '',
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
    ...mapGetters(['getStudent', 'getStudents', 'getStudentByRFID', 'getReaderData']),
    displayStudents () {
      return this.getStudents.filter((e) => e.first_name.toLowerCase().match(this.searchTxt.toLowerCase()) || e.last_name.match(this.searchTxt.toLowerCase()))
    }
  },
  methods: {
    rowHover (item, index, event) {
      this.studentData = this.getStudent(item.id)
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
