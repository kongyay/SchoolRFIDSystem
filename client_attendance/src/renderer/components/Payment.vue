<template>
<div id="wrapper">
    <notifications position="bottom center" group="buy" />
    <b-row>
        <b-col sm="7">
          <icon id="page-icon" name="money" scale=1.8></icon>
          <input id="readerField" type="number" style="hidden:false" 
                        v-model="inputData" v-focus :placeholder="!useID ? 'Product RFID / Student Card RFID' : 'Product ID / Student ID'"
                        @keyup="onKeyboardInput" @blur="onBlurInput" />
            &thinsp;&thinsp;&thinsp;
            <b-form-checkbox id="checkbox_ID" v-model="useID">
                Use ID instead
            </b-form-checkbox>
            <b-table striped hover :items="productsBuy" :fields="productFields">
                <template slot="total" slot-scope="data">
                {{data.item.price*data.item.amount}}
                </template>
                <template slot="amount" slot-scope="data">
                <b-button @click='onIncrease(data.index)' size="sm" variant="link"><icon name="plus-square"></icon> </b-button>
                {{data.value}} 
                <b-button @click='onDecrease(data.index)' size="sm" variant="link"><icon name="minus-square"></icon> </b-button>
                </template>
            </b-table>
        </b-col>
        <b-col sm="5">
            <BuyerCard v-if="buyerData" :buyerData="buyerData"/>
        </b-col>
    </b-row>
    <div class="footer">
        <b-row>
            <b-col sm="9">
                <span>Total: {{totalPrice()}}</span><br>
                <span>After Balance: {{balanceAfter()}}</span>
            </b-col>
            <b-col sm="3">
                <b-button v-if="productsBuy.length>0&&buyerData" variant="primary" @click="confirmBuy">Confirm</b-button>
            </b-col>
        </b-row>
    </div>
 </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import BuyerCard from './Payment/BuyerCard'
export default {
  name: 'Cashier',
  data () {
    return {
      buyerData: undefined,
      productsBuy: [],
      inputData: '',
      useID: false,
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
    ...mapGetters(['getProducts', 'getProduct', 'getProductByRFID', 'getSellHistory', 'getStudent', 'getStudentByRFID', 'getReaderData']),
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
      return (this.buyerData) ? this.buyerData.balance - this.totalPrice() : 0
    },
    onIncrease (i) {
      this.productsBuy[i].amount++
      this.$forceUpdate()
    },
    onDecrease (i) {
      this.productsBuy[i].amount--
      if (this.productsBuy[i].amount <= 0) { this.productsBuy.splice(i, 1) }
      this.$forceUpdate()
    },
    onKeyboardInput (e) {
      if (!this.useID) {
        if (this.inputData.length < 10) return
      } else {
        if (this.inputData.length < 4) return
      }
      this.setReaderData(this.inputData)
      this.inputData = ''
    },
    onBlurInput (e) {
      if (this.focused != null) {
        e.target.focus()
      }
    },
    confirmBuy () {
      let payload =
        {
          'buyer': this.buyerData.id,
          'price': this.totalPrice(),
          'time': new Date(),
          'products': this.productsBuy
        }
      this.newBuy(payload)
      this.buyerData = null
      this.productsBuy = []
    }
  },
  watch: {
    getReaderData () {
      let product = null
      if (!this.useID) {
        if (this.getReaderData.length < 10) return
        product = this.getProductByRFID(this.getReaderData)
      } else {
        if (this.getReaderData.length < 4) return
      }

      if (product) {
        let index = this.productsBuy.findIndex((p) => p.id === product.id)
        if (index < 0) { // new product
          product.amount = 1
          this.productsBuy.push(product)
        } else {
          this.productsBuy[index].amount += 1
        }
      } else {
        let student = null
        if (!this.useID) {
          if (this.getReaderData.length < 10) return
          student = this.getStudentByRFID(this.getReaderData)
        } else {
          if (this.getReaderData.length < 4) return
          student = this.getStudent(this.getReaderData)
        }
        if (student) {
          this.buyerData = student
        } else {
          this.$notify({
            group: 'foo',
            type: 'error',
            title: `No Product/Student with RFID ${this.getReaderData}`
          })
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
  margin-left: 40px;
}
#page-icon {
  position: absolute;
  float: left;
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