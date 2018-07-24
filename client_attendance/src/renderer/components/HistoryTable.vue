<template>
<div class="wrapper">
    <icon id="page-icon" name="history" scale=2></icon>
    <b-input type="text" id="searchField" placeholder="Search.." v-model="searchTxt" v-focus></b-input>
    <b-table striped hover :items="displaySellHistory" :fields="historyFields" small>
        <template slot="time" slot-scope="data">
            {{moment(data.value).format('LTS')}}
        </template>
        <template slot="list" slot-scope="row">
            <b-button size="sm" @click="row.toggleDetails" class="mr-2">
            {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
            </b-button>
        </template>
        <template slot="row-details" slot-scope="row">
            <b-card>
                <b-table striped hover :items="row.item.products" :fields="productFields" small>
                    <template slot="total" slot-scope="data">
                        {{data.item.price*data.item.amount}}
                    </template>
                </b-table>
            </b-card>
        </template>
        
    </b-table>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'History',
  data: () => {
    return {
      searchTxt: '',
      historyFields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'time',
          label: 'Time',
          sortable: true
        },
        {
          key: 'buyer',
          label: 'Buyer',
          sortable: true
        },
        {
          key: 'price',
          label: 'Price',
          sortable: true
        },
        {
          key: 'list',
          label: 'List'
        }
      ],
      productFields: [
        {
          key: 'id',
          label: 'ID',
          sortable: true
        },
        {
          key: 'name',
          label: 'Name',
          sortable: true
        },
        {
          key: 'price',
          label: 'Price',
          sortable: true
        },
        {
          key: 'amount',
          label: 'Amount',
          sortable: true
        },
        {
          key: 'total',
          label: '=',
          sortable: true
        }
      ]

    }
  },
  computed: {
    ...mapGetters(['getSellHistory']),
    displaySellHistory () {
      return this.getSellHistory.filter((e) => e.products.find((p) => p.name.toLowerCase().match(this.searchTxt.toLowerCase())) || e.buyer.match(this.searchTxt))
    }
  },
  method: {
    ...mapActions(['setSellHistory'])
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
