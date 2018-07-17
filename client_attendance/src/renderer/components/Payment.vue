<template>
<div id="wrapper">
    <b-row>
        <b-col sm="7">
          <input id="readerField" type="number" style="hidden:false" 
                        v-model="inputData" autofocus placeholder="Product ID / Student Card ID"
                        @keyup="onKeyboardInput" @blur="onBlurInput" />
            <b-table striped hover :items="productsBuy" :fields="productFields">
                <template slot="total" slot-scope="data">
                {{data.item.price*data.item.amount}}
                </template>
            </b-table>
        </b-col>
        <b-col sm="5">
            <BuyerCard v-if="buyerData!==undefined" :buyerData="buyerData"/>
        </b-col>
    </b-row>
    <div class="footer">
        <b-row>
            <b-col sm="9">
                <span>Total: {{totalPrice()}}</span><br>
                <span>After Balance: {{balanceAfter()}}</span>
            </b-col>
            <b-col sm="3">
                <b-button variant="primary" @click="showNoti">Confirm</b-button>
            </b-col>
        </b-row>
    </div>
 </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BuyerCard from './Payment/BuyerCard'
export default {
  data () {
    return {
      buyerData: undefined,
      productsBuy: [],
      inputData: '',
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
    ...mapGetters(['getProducts', 'getProduct', 'getProductByRFID', 'getSellHistory', 'getStudentByRFID', 'getReaderData']),
    focused () {
      return document.activeElement
    }
  },
  methods: {
    ...mapActions(['newBuy', 'setReaderData', 'clearReaderData']),
    totalPrice () {
      return this.productsBuy.reduce((sum, p) => sum + p.price * p.amount, 0)
    },
    balanceAfter () {
      return (this.buyerData) ? this.buyerData.balance + this.totalPrice() : 0
    },
    onIncrease (e) {
      console.log(e.target)
    },
    onDecrease (e) {
      console.log(e.target)
    },
    onKeyboardInput (e) {
      if (this.inputData.length > 9) {
        console.log(this.inputData)
        this.setReaderData(this.inputData)
        this.inputData = ''
      }
    },
    onBlurInput (e) {
      if (this.focused != null) {
        e.target.focus()
      }
    },
    showNoti () {
      this.$snotify.success({
        body: 'Success Body',
        title: 'Success Title',
        config: {}
      })
    }
  },
  watch: {
    getReaderData () {
      if (this.getReaderData.length < 10) return
      let product = this.getProductByRFID(this.getReaderData)

      if (product) {
        let index = this.productsBuy.findIndex((p) => p.id === product.id)
        if (index < 0) { // new product
          product.amount = 1
          this.productsBuy.push(product)
        } else {
          this.productsBuy[index].amount += 1
        }
      } else {
        let student = this.getStudentByRFID(this.getReaderData)
        if (student) {
          this.buyerData = student
        } else {
          alert('Unknown ID:' + this.getReaderData)
        }
      }
      this.clearReaderData()
    }
  },
  components: {BuyerCard}
}
</script>

<style scoped>
#readerField {
  width: 100%;
}
.footer {
  padding: 1px;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.514);
  color: rgb(255, 255, 255);
}
.footer b-button {
  padding: 1px;
}
</style>