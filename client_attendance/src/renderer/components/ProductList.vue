<template>
    <div class='wrapper'>
      <icon id="page-icon" name="cutlery" scale=2></icon>
        <b-input type="text" id="searchField" placeholder="Search.." v-model="searchTxt" v-focus></b-input>
        <b-table striped hover :items="displayProducts" :fields="attFields" :sort-compare="sort_compare">
            <template slot="stat" slot-scope="data">
              <b-progress :value="countStat(data.item.id)" show-value :max="20"></b-progress>
            </template>
          
            <template slot="edit" slot-scope="data">
              <b-button v-if="getUserRole==='admin'" size="sm" class="mr-2" @click='setModal(data.item)' v-b-modal.editModal>
                Edit
              </b-button>
            </template>
      </b-table>
      <b-modal id="editModal" title="Edit" hide-footer>
        <b-form-group horizontal label="Name" class="mb-0">
            <b-form-input v-model="edit_name"/>
        </b-form-group>
        <b-form-group horizontal label="Price" class="mb-0">
            <b-form-input type="number" v-model="edit_price"/>
        </b-form-group>
        <b-form-group horizontal label="Type" class="mb-0">
            <b-input-group>
              <b-form-select slot="append" v-model="edit_type">
                <option value="food">Food</option>
                <option value="topup">Topup Card</option>
              </b-form-select>
            </b-input-group>
        </b-form-group>
        <hr>
        <b-button size="sm" variant="danger">
          Remove This product
        </b-button>
      </b-modal>
    </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      searchTxt: '',
      edit_id: '',
      edit_name: '',
      edit_price: 0,
      edit_type: '',
      attFields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name',
          label: 'Name',
          sortable: true
        }, {
          key: 'price',
          label: 'Price',
          sortable: true
        }, {
          key: 'type',
          label: 'Type',
          sortable: true
        }, {
          key: 'stat',
          label: 'Stat.',
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
    ...mapGetters(['getProducts', 'getSellHistory', 'getUserRole']),
    displayProducts () {
      return this.getProducts.filter((e) => e.name.toLowerCase().match(this.searchTxt.toLowerCase()))
    },
    freq () {

    },
    max () {

    }
  },
  methods: {
    sort_compare (a, b, key) {
      if (key === 'stat') {
        let af = this.countStat(a.id)
        let bf = this.countStat(b.id)
        return af < bf ? -1 : (af > bf ? 1 : 0)
      }
      if (typeof a[key] === 'number' && typeof b[key] === 'number') {
        // If both compared fields are native numbers
        return a[key] < b[key] ? -1 : (a[key] > b[key] ? 1 : 0)
      } else {
        // Stringify the field data and use String.localeCompare
        return a[key].localeCompare(b[key])
      }
    },
    countStat (id) {
      return this.getSellHistory.reduce((sum, e) => {
        let i = e.products.find(p => p.id === id)
        return sum + ((i) ? i.amount : 0)
      }, 0)
    },
    setModal (product) {
      this.edit_id = product.id
      this.edit_name = product.name
      this.edit_price = product.price
      this.edit_type = product.type
    }
  }
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
</style>
