<template>
  <Header></Header>
  <div class="wrapper">
    <step-item :number="number"></step-item>
    <Form>
      <div class="form-wrapper">
        <h2 class="ttl">お届け先入力</h2>
        <div class="item-wrapper">
          <div class="form-item">
            <label class="form-label">姓</label>
            <Field name="firstName" type="text" v-model="firstName" placeholder="のび" class="input-name"
              :rules="firstNameRules" />
          </div>
          <ErrorMessage name="firstName" class="error" />
        </div>
        <div class="item-wrapper">
          <div class="form-item">
            <label class="form-label">名</label>
            <Field name="lastName" type="text" v-model="lastName" placeholder="のび太" class="input-name"
              :rules="lastNameRules" />
          </div>
          <ErrorMessage name="lastName" class="error" />
        </div>
        <div class="item-wrapper">
          <div class="form-item-post">
            <label class="form-label-post">
              郵便番号
            </label>
            <span>〒</span>
            <div class="zipcode-wrapper">
              <Field name="zipcode" type="number" v-model="zipcode" placeholder="1790076" class="input-zipcode"
                :rules="zipcodeRules" />
              <ErrorMessage name="zipcode" class="error" />
            </div>
            <button @click="searchAddress" class="search-address">
              住所検索
            </button>
          </div>
        </div>
        <div class="item-wrapper">
          <div class="form-item">
            <label class="form-label">
              都道府県
            </label>
            <Field name="prefecture" type="text" v-model="prefecture" placeholder="東京都" class="input-prefecture"
              :rules="prefectureRules" />
          </div>
          <ErrorMessage name="prefecture" class="error"/>
        </div>
        <div class="item-wrapper">
          <div class="form-item">
            <label class="form-label">
              市区町村
            </label>
            <Field name="city" type="text" v-model="city" placeholder="練馬区月見台すすきが原" class="input-city"
              :rules="cityRules"/>
          </div>
          <ErrorMessage name="city" class="error"/>
        </div>
        <div class="form-item-building">
          <label class="form-label">
            建物名
          </label>
          <input type="text" v-model="building" placeholder="3-10-5" class="input-building">
        </div>
      </div>
      <div class="form-wrapper">
        <h2 class="ttl">お届け日時</h2>
        <div class="form-item-delivery">
          <label class="form-label">
            配達希望日
          </label>
          <input type="date" v-model="date" class="input-date">
        </div>
        <div class="form-item-delivery">
          <label class="form-label">
            配達希望時間
          </label>
          <input type="time" v-model="time" class="input-time" list="data-list">
          <datalist id="data-list">
            <option value="08:00"></option>
            <option value="10:00"></option>
            <option value="12:00"></option>
            <option value="14:00"></option>
            <option value="16:00"></option>
            <option value="18:00"></option>
            <option value="20:00"></option>
          </datalist>
        </div>
      </div>
      <div class="form-wrapper">
        <h2 class="card-ttl">クレジットカード情報入力</h2>
        <div class="container">
          <div id="card-element"></div>
          <button @click="register" class="card-btn" type="button">
            カード情報を登録する
          </button>
          <p v-if="isActive" class="register-msg">
            登録しました
          </p>
          <p v-if="cardError" class="error">
            カード情報が取得できませんでした
          </p>
        </div>
      </div>
    </Form>
    <div class="next-btn-wrap">
      <router-link to="/cart" class="cart-btn">戻る</router-link>
      <router-link to="/comfirm" class="cart-btn">次へ</router-link>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import StepItem from '@/components/StepItem.vue';
import Header from '@/components/SubHeader.vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from "yup";

export default {
  name: 'Customer',
  components: {
    'step-item': StepItem,
    Header,
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    return {
      addressForm: false,
      card: false,
      stripe: window.Stripe('pk_test_51MhDWaIyOIzAJ2a5mH4EtBdCebBr8GDdnnN51dg7XZiLi32UDcJ517Wf5n5XiIYDxqyhSXZ0UFnHUd0Hx5GYlyst00FraPX1Qt'),
      show_result: false,
      detetime: '',
      isActive: false,
      cardError: false,
      number: 2,
      firstNameRules: yup.string().required('※入力必須項目です'),
      lastNameRules: yup.string().required('※入力必須項目です'),
      zipcodeRules: yup.string().required('※入力必須項目です').min(7, '7文字で入力してください').max(8, '7文字で入力してください'),
      prefectureRules: yup.string().required('※入力必須項目です'),
      cityRules: yup.string().required('※入力必須項目です').max(255, '255文字以内で入力してください'),
    }
  },
  mounted() {
    const elements = this.stripe.elements();
    this.card = elements.create("card", { hidePostalCode: true });
    this.card.mount("#card-element");
  },
  computed: {
    firstName: {
      get() {
        return this.$store.state.purchase.firstName;
      },
      set(value) {
        this.$store.commit('purchase/setFirstName', value);
      }
    },
    lastName: {
      get() {
        return this.$store.state.purchase.lastName;
      },
      set(value) {
        this.$store.commit('purchase/setLastName', value);
      }
    },
    zipcode: {
      get() {
        return this.$store.state.purchase.zipcode;
      },
      set(value) {
        this.$store.commit('purchase/setZipcode', value);
      }
    },
    prefecture: {
      get() {
        return this.$store.state.purchase.prefecture;
      },
      set(value) {
        this.$store.commit('purchase/setPrefecture', value);
      }
    },
    city: {
      get() {
        return this.$store.state.purchase.city;
      },
      set(value) {
        this.$store.commit('purchase/setCity', value);
      }
    },
    building: {
      get() {
        return this.$store.state.purchase.building;
      },
      set(value) {
        this.$store.commit('purchase/setBuilding', value);
      }
    },
    date: {
      get() {
        return this.$store.state.purchase.date;
      },
      set(value) {
        this.$store.commit('purchase/setDate', value);
      }
    },
    time: {
      get() {
        return this.$store.state.purchase.time;
      },
      set(value) {
        this.$store.commit('purchase/setTime', value);
      }
    }
  },
  methods: {
    async searchAddress() {
      let zipcode = this.zipcode;
      let url = 'http://zipcloud.ibsnet.co.jp/api/search?zipcode=';
      let result = await axios.get(url + zipcode);
      let address = result.data.results[0]
      this.prefecture = address.address1
      this.city = address.address2 + address.address3
    },
    register() {
      this.show_result = false;
      this.stripe.createToken(this.card).then(result => {
        if (result.error) {
          this.show_result = true;
          this.cardError = true;
          this.isActive = false;
        } else {
          this.show_result = true;
          this.isActive = true;
          this.cardError = false;
          this.$store.commit('purchase/setTokenId', result.token.id);
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
  padding: 50px 50px;
  margin: 50px auto 0;
  border: 2px #999 solid;
}
.item-wrapper {
  margin-bottom: 40px;
}
.zipcode-wrapper {
  display: flex;
  margin-right: 20px;
}
.form-item-post,
.form-item-prefecture {
  display: flex;
  align-items: center;
  /* margin-bottom: 40px; */
}
.form-item,
.form-item-building,
.form-item-delivery {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.form-item-building,
.form-item-delivery {
  margin-bottom: 20px;
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
.input-name,
.input-city,
.input-building,
.input-prefecture,
.input-date,
.input-time {
  width: 540px;
}
.input-name,
.input-city,
.input-building,
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
.card-ttl {
  margin-bottom: 40px;
}
.card-btn {
  width: 250px;
  margin-top: 30px;
  border-radius: 5px;
}
.register-msg {
  color: #CA8A8A;
  margin-top: 10px;
}
.error {
  margin-top: 10px;
}

@media screen and (max-width:768px) {
  .form-item,
  .form-item-building,
  .form-item-delivery {
    display: block;
  }
  .form-wrapper {
    width: 70%;
    padding: 50px 70px;
  }
  .form-label {
    margin-bottom: 20px;
  }
  .input-name,
  .input-prefecture,
  .input-city,
  .input-building,
  .input-date,
  .input-time {
    width: 95%;
  }
  .form-label-post {
    margin-right: 10px;
  }
}
</style>