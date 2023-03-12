<template>
  <div class="header">
    <router-link to="/mypage" class="head-btn">
    戻る
    </router-link>
  </div>
  <div class="details-wrapper">
    <h1 class="ttl">商品詳細ページ</h1>
    <table class="product-table">
      <tr>
        <th class="head-product">商品名</th>
        <th class="head">商品イメージ</th>
        <th class="head">個数</th>
        <th class="head">価格</th>
        <th class="head sub-total">小計</th>
      </tr>
      <tr>
        <td class="label-product">{{ itemDetails.product.name }}</td>
        <td class="label">
          <div class="img-wrapper">
            <img :src="'http://localhost:8000/storage/' + itemDetails.product.path" alt="購入商品画像" class="image">
          </div>
        </td>
        <td class="label">{{ itemDetails.count }}</td>
        <td class="label">{{ itemDetails.product.price }}</td>
        <td class="label sub-total">
        {{ itemDetails.count * itemDetails.product.price }}
        </td>
      </tr> 
    </table>
    <Form>
      <div class="form-wrapper">
        <h2 class="ttl">お届け先住所</h2>
        <div class="form-item">
          <label class="form-label">氏名</label>
          <Field name="name" type="text" v-model="fullname" :placeholder="itemDetails.fullname" class="input-name" :rules="nameRules"/>
        </div>
        <ErrorMessage name="name" class="error"/>
        <div class="form-item-post">
          <label class="form-label-post">郵便番号</label>
          <span>〒</span>
          <Field name="zipcode" type="number" v-model="zipcode" :placeholder="itemDetails.postcode" class="input-zipcode" :rules="zipcodeRules"/>
          <ErrorMessage name="zipcode" class="error"/>
          <button type="buttn" @click="searchAddress" class="search-address">
          住所検索
          </button>
        </div>
        <div class="form-item">
          <label class="form-label">都道府県</label>
          <Field name="prefecture" type="text" v-model="prefecture" :placeholder="itemDetails.prefecture" class="input-prefecture" :rules="prefectureRules"/>
        </div>
        <ErrorMessage name="prefecture" class="error"/>
        <div class="form-item">
          <label class="form-label">市区町村</label>
          <Field name="city" type="text" v-model="city" :placeholder="itemDetails.city" class="input-city" :rules="cityRules"/>
        </div>
        <ErrorMessage name="city" class="error"/>
        <div class="form-item">
          <label class="form-label">建物名</label>
          <input type="text" v-model="building" :placeholder="itemDetails.building_name" class="input-building">
        </div>
      </div>
      <div class="form-wrapper">
        <h2 class="ttl">お届け日時</h2>
        <div class="form-item">
          <label class="form-label">配達希望日</label>
          <input type="date" v-model="date" class="input-date">
        </div>
        <p class="datetime">{{ '設定日：' +itemDetails.delivery_date }}</p>
        <div class="form-item">
          <label class="form-label">配達希望時間</label>
          <input type="time" v-model="time" class="input-time" list="data-list" >
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
        <p class="datetime">{{ '設定時間：' + itemDetails.delivery_time }}</p>
      </div>
      </Form>
      <button @click="change" class="change-btn">変更する</button>
      </div>
</template>

<script>
import axios from 'axios';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from "yup";

export default {
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    return {
      itemDetails: this.$store.state.purchase.myItemDetails,
      fullname: "",
      zipcode: "",
      prefecture: "",
      city: "",
      building: "",
      date: "",
      time: "",
      nameRules: yup.string().required('※入力必須項目です'),
      zipcodeRules: yup.string().required('※入力必須項目です').min(7, '7文字で入力してください').max(8, '7文字で入力してください'),
      prefectureRules: yup.string().required('※入力必須項目です'),
      cityRules: yup.string().required('※入力必須項目です').max(255, '255文字以内で入力してください'),
    };
  },
  methods: {
    async change() {
      await axios.put("http://localhost:8000/api/v1/purchase/" + this.itemDetails.id, {
        fullname: this.fullname,
        postcode: this.zipcode,
        prefecture: this.prefecture,
        city: this.city,
        building_name: this.building,
        delivery_date: this.date,
        delivery_time: this.time,
      }).then(() => {
        alert('住所変更が完了しました');
        this.$router.push('/mypage');
      }).catch(() => {
        alert('入力内容に誤りがあります')
      });
    }
  },
}
</script>

<style scoped>
.head-btn {
  border: 1px solid #D1DA6D;
  background-color: #D1DA6D;
}
.details-wrapper {
  padding: 70px 40px;
  background-color: #fff;
}
.ttl {
  font-size: 40px;
  margin-bottom: 30px;
}
.product-table {
  width: 70%;
  margin: 20px auto 50px;
}
.head,
.head-product {
  padding: 20px 30px;
  color: #fff;
  background-color: #3F89CD;
}
.label,
.label-product {
  vertical-align: middle;
  border-bottom: 1px solid #999;
}
.label-product,
.head-product {
  border-left: 1px solid #999;
}
.sub-total {
  border-right: 1px solid #999;
}
.img-wrapper {
  width: 100%;
  height: 180px;
}
.image {
  width:auto;
  height:auto;
  max-width:100%;
  max-height:100%;
}
.form-wrapper {
  width: 760px;
  padding: 50px 50px;
  margin: 50px auto 0;
  border: 1px #999 solid;
}
.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.form-item-post {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}
.form-label,
.form-label-post {
  display: block;
  width: 110px;
  padding: 12px;
  font-weight: bold;
  color: #fff;
  background-color: #3F89CD;
  border-radius: 5px;
}
.form-label-post {
  margin-right: 60px;
}
.input-name,
.input-city,
.input-building,
.input-prefecture,
.input-zipcode,
.input-date,
.input-time {
  width: 540px;
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
.datetime {
  margin-bottom: 30px;
}
.error {
  margin-right: 10px;
}
.change-btn {
  width: 150px;
  margin-top: 40px;
  border-radius: 5px;
}
::placeholder {
  color: #000;
}

@media screen and (max-width:768px) {
  .product-table {
    width: 95%;
  }
  .label-product {
    font-size: 16px;
  }
  .form-wrapper {
    width: 80%;
  }
  .form-item {
    display: block;
  }
  .form-label {
    margin-bottom: 20px;
  }
  .form-label-post {
    margin-right: 10px;
  }
  .input-name,
  .input-city,
  .input-building,
  .input-prefecture,
  .input-date,
  .input-time {
    width: 95%;
  }
}
</style>