<template>
  <div class="wrapper">
      <item-component></item-component>
      <template v-for="(item, index) in cartItem" :key="item">
        <p class="number">商品{{ index + 1 }}</p>
        <table class="cart-table">
          <tr>
            <td class="label">商品名</td>
            <td class="content name">{{ item.name }}</td>
          </tr>
          <tr>
            <td class="label">個数</td>
            <td class="content">{{ item.count }}</td>
          </tr>
          <tr>
            <td class="label">小計</td>
            <td class="content">￥{{ item.price }}</td>
          </tr>
          <tr>
            <td class="label">合計</td>
            <td class="content total">￥{{ item.price * item.count }}</td>
          </tr>
        </table>
      </template>
      <p class="payment">￥{{ price }}</p>
      <h2>お届け先</h2>
      <table class="cart-table">
        <tr>
          <td class="label">名前</td>
          <td class="content name">{{ firstName + ' ' + lastName }}</td>
        </tr>
        <tr>
          <td class="label">郵便番号</td>
          <td class="content">{{ firstZipcode + '-' + lastZipcode }}</td>
        </tr>
        <tr>
          <td class="address-label">住所</td>
          <td class="content address">{{ prefecture + city + building}}</td>
        </tr>
      </table>
      <h2>お届け日時</h2>
      <table class="cart-table">
        <tr>
          <td class="label">希望日時</td>
          <td class="content date">{{ date }}</td>
        </tr>
        <tr>
          <td class="label">希望時間</td>
          <td class="content time">{{ time }}</td>
        </tr>
      </table>
      <p>{{ tokenId }}</p>
      <div class="next-btn-wrap">
        <router-link to="/customer" class="cart-btn">戻る</router-link>
        <button @click="pay" class="pay-btn">購入する</button>
      </div>
  </div>

</template>

<script>
import axios from 'axios';
import firebase from '../main';
import StepItem from '@/components/StepItem.vue';
export default {
  components: {
    'item-component': StepItem
  },
  data() {
    return {
      cartItem: this.$store.state.purchase.carts,
      firstName: this.$store.state.purchase.firstName,
      lastName: this.$store.state.purchase.lastName,
      firstZipcode: this.$store.state.purchase.firstZipcode,
      lastZipcode: this.$store.state.purchase.lastZipcode,
      prefecture: this.$store.state.purchase.prefecture,
      city: this.$store.state.purchase.city,
      building: this.$store.state.purchase.building,
      date: this.$store.state.purchase.date,
      time: this.$store.state.purchase.time,
      price: 0,
      tokenId: this.$store.state.purchase.tokenId
    }
  },
  mounted() {
    this.cartItem.forEach(element => {
      this.price = this.price + element.count * element.price;
    })
  },
  methods: {
    pay() {
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
        axios
          .post("http://localhost:8000/api/v1/payment", {
            stripeToken: this.tokenId,
            email: user.email,
            amount: this.price
          })
          .then((response) => {
            console.log(response);
            alert('やったね！');
            this.$store.commit('purchase/reset');
          });
        }
      })
    }
  },
}
</script>

<style scoped>
.wrapper {
  background-color: #fff;
  padding: 40px;
}
.cart-table {
  border-collapse: separate;
  width: 60%;
  margin: 0 auto;
  /* background-color: pink; */
}
.number {
  margin: 40px 0px 20px;
}
.label,
.address-label {
  width: 200px;
  padding: 15px;
  color: #fff;
  background-color: #3F89CD;
}
.content {
  border-right: 1px solid #999;
  /* border-top: 1px solid #999; */
}
.name,
.date {
  border-top: 1px solid #999;
}
.total,
.address,
.time {
  border-bottom: 1px solid #999;
}
.address-label {
  vertical-align: middle;
}
.address {
  padding: 20px;
}
.payment {
  width: 60%;
  /* padding: 10px; */
  margin: 30px auto;
  font-size: 25px;
  font-weight: bold;
  text-align: right;
  background-color: pink;
}
.next-btn-wrap {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 80px auto;
}
.cart-btn,
.pay-btn {
  background-color: #D1DA6D;
  border: 1px solid #D1DA6D;
}
.pay-btn {
  width: 150px;
  color: #fff;
  margin-right: 470px;
  background-color: #CA8A8A;
  cursor: pointer;
  border-radius: 5px;
  font-size: 20px;
}
.pay-btn:hover {
  font-weight: bold;
}
</style>