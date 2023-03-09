<template>
  <div class="wrapper">
      <item-component></item-component>
       <template v-for="item in products" :key="item">
          <template v-if="item.count">
        <!-- <p class="number">商品{{ index + 1 }}</p> -->
        <div>
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
      
      <p class="payment">
      <span v-if="present">-500円</span>
      合計￥{{ price }}
      </p>
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
      <button @click="test">テスt</button>
  </div>

</template>

<script>
import axios from 'axios';
import firebase from '../main';
import StepItem from '@/components/StepItem.vue';
// import store from '@/store';
export default {
  components: {
    'item-component': StepItem
  },
  data() {
    return {
      present: this.$store.state.purchase.presentItem,
      diagnosisId: this.$store.state.diagnoses.results[0].diagnosis_id,
      products: [],
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
  async mounted() {
      const cartBox = await axios
        .get("http://localhost:8000/api/v1/cart");
      const productItem = await axios
        .get("http://localhost:8000/api/v1/purchase");
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
            element.cartId = value.id
            if (element.count !== 0 && !this.ele) {
              this.price += element.price;
          }
          }
          
        })
      })
    if (this.present) {
      this.price -= 500;
    }
      console.log(this.products)
    console.log(this.present)
    // this.cartItem.forEach(element => {
    //   this.price = this.price + element.count * element.price;
    // })
  },
  methods: {
    pay() {
      const store = this.$store.state.purchase;
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
          this.products.forEach(element => {
            if (element.count !== 0) {
              console.log(element.id)
              axios.post("http://localhost:8000/api/v1/customer", {
                user_id: user.uid,
                fullname: store.firstName + store.lastName,
                postcode: store.firstZipcode + '' + store.lastZipcode,
                prefecture: store.prefecture,
                city: store.city,
                building_name: store.building,
                delivery_date: store.date,
                delivery_time: store.delivery_time,
                product_id: element.id,
                count: element.count
              }).then(() => {
                console.log('成功');
              });
            }
          });
          // this.$router.push('/comfirm');
        }
        });
      
      // firebase.auth().onAuthStateChanged((user) => {
      //   if (user) {
      //   axios
      //     .post("http://localhost:8000/api/v1/payment", {
      //       stripeToken: this.tokenId,
      //       email: user.email,
      //       amount: this.price
      //     })
      //     .then((response) => {
      //       console.log(response);
      //       alert('やったね！');
      //       // this.$store.commit('purchase/reset');
      //     });
      //   }
      // })
      // firebase.auth().onAuthStateChanged((user) => {
      //   if (user) {
      //     axios.post("http://localhost:8000/api/v1/customer", {
      //       user_id: user.uid,
      //       fullname: store.firstName + store.lastName,
      //       postcode: store.firstZipcode + '' + store.lastZipcode,
      //       prefecture: store.prefecture,
      //       city: store.city,
      //       building_name: store.building,
      //       delivery_date: store.date,
      //       delivery_time: store.delivery_time,
      //     }).then(() => {
      //       console.log('成功1');
      //       // this.$router.push('/cart');
      //     });
      //   }
      //   })
    
    },
    test() {
      // const storess = this.$store.state.purchase;
      // console.log(storess.firstZipcode + '' + storess.lastZipcode)
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