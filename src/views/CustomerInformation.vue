<template>
  <div class="wrapper">
    <item-component></item-component>
    <div class="form-wrapper">
      <h2 class="ttl">お届け先入力</h2>
      <div class="form-item">
        <label class="form-label">氏名</label>
        <input type="text" v-model="firstName" placeholder="のび" class="input-name">
        <input type="text" v-model="lastName" placeholder="のび太" class="input-name">
      </div>
      <div class="form-item-post">
      <label class="form-label-post">郵便番号</label>
      <span>〒</span>
      <input type="number" v-model="firstZipcode" class="input-zipcode">
      <span>ー</span>
      <input type="number" v-model="lastZipcode" class="input-zipcode">
      <button @click="searchAddress" class="search-address">住所検索</button>
      </div>
      <div class="form-item">
        <label class="form-label">都道府県</label>
        <input type="text" v-model="prefecture" class="input-prefecture">
      </div>
      <div class="form-item">
        <label class="form-label">市区町村</label>
        <input type="text" v-model="city" class="input-city">
      </div>
      <div class="form-item">
        <label class="form-label">建物名</label>
        <input type="text" v-model="building" class="input-building">
      </div>
    </div>
    <div class="form-wrapper">
      <h2>お届け日時</h2>
      <div class="form-item">
        <label class="form-label">配達希望日</label>
        <input type="date" v-model="date" :min="this.datetime" class="input-date">
      </div>
      <div class="form-item">
        <label class="form-label">配達希望時間</label>
        <input type="time" v-model="time" class="input-time">
      </div>
    </div>
    <div class="form-wrapper">
      <h2>クレジットカード情報入力</h2>
      <div class="container">
      <div id="card-element">
      </div>
      <button @click="register">カード情報を登録する</button>
    </div>
    </div>
    <div class="next-btn-wrap">
      <router-link to="/cart" class="cart-btn">戻る</router-link>
      <router-link to="/comfirm" class="cart-btn">次へ</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import StepItem from '@/components/StepItem.vue';
export default {
  name: 'Customer',
  components: {
    'item-component': StepItem
  },
  data() {
    return {
      addressForm: false,
      card: null,
      stripe: window.Stripe('pk_test_51MhDWaIyOIzAJ2a5mH4EtBdCebBr8GDdnnN51dg7XZiLi32UDcJ517Wf5n5XiIYDxqyhSXZ0UFnHUd0Hx5GYlyst00FraPX1Qt'),
      show_result: false,
      result_message: "",
      detetime: ''
      // cartItem: this.$store.state.diagnoses.carts,
      // price:[]
    }
  },
  mounted() {
    const elements = this.stripe.elements();
    this.card = elements.create("card");
    this.card.mount("#card-element");

    var hiduke = new Date();
    let year = hiduke.getFullYear();
    let month = hiduke.getMonth() + 1;
    let day = hiduke.getDate();
    this.datetime = `${year}-${month}-${day}`;
  },
  computed: {
    firstName: {
      get() {
        return this.$store.state.purchase.firstName;
      },
      set(value) {
        this.$store.commit('purchase/setFirstName', value)
      }
    },
    lastName: {
      get() {
        return this.$store.state.purchase.lastName;
      },
      set(value) {
        this.$store.commit('purchase/setLastName', value)
      }
    },
    firstZipcode: {
      get() {
        return this.$store.state.purchase.firstZipcode;
      },
      set(value) {
        this.$store.commit('purchase/setFirstZipcode', value)
      }
    },
    lastZipcode: {
      get() {
        return this.$store.state.purchase.lastZipcode;
      },
      set(value) {
        this.$store.commit('purchase/setLastZipcode', value)
      }
    },
    prefecture: {
      get() {
        return this.$store.state.purchase.prefecture;
      },
      set(value) {
        this.$store.commit('purchase/setPrefecture', value)
      }
    },
    city: {
      get() {
        return this.$store.state.purchase.city;
      },
      set(value) {
        this.$store.commit('purchase/setCity', value)
      }
    },
    building: {
      get() {
        return this.$store.state.purchase.building;
      },
      set(value) {
        this.$store.commit('purchase/setBuilding', value)
      }
    },
    date: {
      get() {
        return this.$store.state.purchase.date;
      },
      set(value) {
        this.$store.commit('purchase/setDate', value)
      }
    },
    time: {
      get() {
        return this.$store.state.purchase.time;
      },
      set(value) {
        this.$store.commit('purchase/setTime', value)
      }
    }
  },
  methods: {
    async searchAddress() {
      let zipcode = '' + this.firstZipcode + this.lastZipcode;
      let url = 'http://zipcloud.ibsnet.co.jp/api/search?zipcode=';
      let result = await axios.get(url + zipcode);
      let address = result.data.results[0]
      this.prefecture = address.address1
      this.city = address.address2 + address.address3
    },
    register() {
      // const self = this;
      this.show_result = false;
      this.stripe.createToken(this.card).then(result => {
        // エラーの場合
        if (result.error) {
          this.show_result = true;
          this.result_message = result.error.message;
          // 成功の場合
        } else {
          this.show_result = true;
          this.$store.commit('purchase/setTokenId', result.token.id)
          // this.result_message = result.token.id;
          // console.log(this.result_message)
        }
      });
    }
  }
}
</script>

<style scoped>
.wrapper {
  background-color: #fff;
  padding: 40px;
}
.form-wrapper {
  width: 750px;
  padding: 20px 50px;
  margin: 50px auto 0;
  border: 3px #000 solid;
}

.form-item-post,
.form-item-prefecture {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}
.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.form-label,
.form-label-post {
  display: block;
  width: 110px;
  padding: 10px;
  font-weight: bold;
  color: #fff;
  background-color: #3F89CD;
  border-radius: 5px;
}
.form-label-post {
  margin-right: 60px;
}

.ttl {
  margin-bottom: 40px;
  font-size: 35px;
}

.input-city,
.input-building,
.input-tel,
.input-prefecture,
.input-date,
.input-time {
  width: 540px;
}

.input-name {
  width: 227px;
}

.input-name,
.input-city,
.input-building,
.input-tel,
.input-prefecture,
.input-zipcode,
.input-date,
.input-time {
  height: 40px;
  font-size: 18px;
  padding: 5px 10px;
  border: 1px solid #999;
  border-radius: 5px;
}

.input-zipcode {
  width: 100px;
  margin: 0px 20px;
}

.search-address {
  padding: 5px 10px;
  border: 1px solid #999;
  border-radius: 5px;
}
.next-btn-wrap {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin: 80px auto;
}
.cart-btn {
  background-color: #D1DA6D;
  border: 1px solid #D1DA6D;
}
</style>