<template>
  <Header></Header>
  <div class="wrapper">
      <step-component :number="number"></step-component>
        <template v-for="item in products" :key="item">
          <template v-if="item.count">
        <div>
        <h2 class="ttl">カート商品</h2>
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
            <td class="label">価格</td>
            <td class="content">￥{{ item.price }}</td>
          </tr>
          <tr>
            <td class="label">小計</td>
            <td class="content total">￥{{ item.price * item.count }}</td>
          </tr>
        </table>
        </div>
        </template>
      </template>
      <div class="price-wrapper">
      <p class="present" v-if="present">-500円</p>
      <p class="payment">合計￥{{ price }}
      </p>
      </div>
      <h2 class="ttl">お届け先</h2>
      <table class="cart-table">
        <tr>
          <td class="label">名前</td>
          <td class="content name">{{ firstName + ' ' + lastName }}</td>
        </tr>
        <tr>
          <td class="label">郵便番号</td>
          <td class="content">{{ zipcode }}</td>
        </tr>
        <tr>
          <td class="address-label">住所</td>
          <td class="content address">{{ prefecture + city + building}}</td>
        </tr>
      </table>
      <h2 class="ttl">お届け日時</h2>
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
      <div class="next-btn-wrap">
        <router-link to="/customer" class="cart-btn">戻る</router-link>
        <button @click="pay" class="pay-btn">購入する</button>
      </div>
      <p v-if="cardError" class="error">
      クレジットカード情報が取得できませんでした</p>
      <p v-if="showError" class="error">
      入力内容に誤りがあります
      </p>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from '../main';
import StepItem from '@/components/StepItem.vue';
import Header from '@/components/SubHeader.vue';

export default {
  components: {
    'step-component': StepItem,
    Header
  },
  data() {
    return {
      present: this.$store.state.purchase.presentItem,
      diagnosisId: this.$store.state.diagnoses.results[0].diagnosis_id,
      products: [],
      firstName: this.$store.state.purchase.firstName,
      lastName: this.$store.state.purchase.lastName,
      zipcode: this.$store.state.purchase.zipcode,
      prefecture: this.$store.state.purchase.prefecture,
      city: this.$store.state.purchase.city,
      building: this.$store.state.purchase.building,
      date: this.$store.state.purchase.date,
      time: this.$store.state.purchase.time,
      price: 0,
      tokenId: this.$store.state.purchase.tokenId,
      number: 3,
      cardError: false,
      showError: false
    }
  },
  async mounted() {
      const cartBox = await axios.get("http://localhost:8000/api/v1/cart");
      const productItem = await axios.get("http://localhost:8000/api/v1/purchase");
      productItem.data.filter(element => {
        if (element.diagnosis_id === this.diagnosisId) {
          this.products.push(element);
        }
      })
    this.products.forEach(element => {
      element.count = 0;
      cartBox.data.forEach(value => {
        if (element.id === value.product_id) {
          element.count++;
          element.cartId = value.id;
          if (element.count !== 0 && !this.ele) {
            this.price += element.price;
          }
        }
      });
    });
    if (this.present) {
      this.price -= 500;
    }
  },
  methods: {
    async pay() {
      if (this.firstName !== '' && this.lastName !== '' && this.zipcode !== '' && this.prefecture !== '' && this.city !== '' && this.city.length <= 255 && this.tokenId !== '') {
        firebase.auth().onAuthStateChanged((user) => {
          if (user) {
            axios.post("http://localhost:8000/api/v1/payment", {
                stripeToken: this.tokenId,
                email: user.email,
                amount: this.price
              });
            this.products.forEach(element => {
              if (element.count !== 0) {
                axios.post("http://localhost:8000/api/v1/purchase", {
                  user_id: user.uid,
                  product_id: element.id,
                  fullname: this.firstName + this.lastName,
                  postcode: this.zipcode,
                  prefecture: this.prefecture,
                  city: this.city,
                  building_name: this.building,
                  delivery_date: this.date,
                  delivery_time: this.time,
                  count: element.count
                }).then(() => {
                  this.$router.push('/thanks');
                  this.$store.commit('purchase/reset');
                  this.$store.commit('diagnoses/reset');
                });
              }
            });
          }
        });
      } else if (!this.tokenId) {
        this.cardError = true;
      } else {
        this.showError = true;
      }
      const cartBox = await axios
        .get("http://localhost:8000/api/v1/cart");
      cartBox.data.forEach(element => {
        axios.delete("http://localhost:8000/api/v1/cart/" + element.product_id);
      });
    },
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
}
.number {
  margin: 40px 0px 20px;
}
.label,
.address-label {
  width: 200px;
  padding: 20px 15px;
  color: #fff;
  background-color: #3F89CD;
}
.content {
  border-right: 1px solid #999;
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
  font-size: 25px;
  font-weight: bold;
}
.present {
  font-size: 20px;
  margin-right: 100px;
}
.price-wrapper {
  display: flex;
  justify-content: right;
  margin: 0 auto;
  width: 55%;
  padding: 40px 40px 10px;
  align-items: center;
  color: #CA8A8A;
  border-bottom: 1px solid #999;
}
.ttl {
  margin: 50px 0px 20px;
}
.next-btn-wrap {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 80px auto 40px;
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

@media screen and (max-width:768px) {
  .cart-table {
    width: 80%;
  }
  .pay-btn {
    margin-right: 230px;
  }
}
</style>