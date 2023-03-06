<template>
  <div class="wrapper">
  <div class="form-wrapper">
    <h1 class="ttl">お客様情報入力</h1>
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
  <button class="register-btn" @click="test">登録</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Address',
  // props: ['name', 'diagnoses'],
  data() {
    return {
      firstName: '',
      lastName: '',
      firstZipcode: '',
      lastZipcode: '',
      prefecture: '',
      city: '',
      building: '',
      tel: ''
    }
  },
  methods: {
    test() {

    },
    async searchAddress() {
      let zipcode = '' + this.firstZipcode + this.lastZipcode;
      let url = 'http://zipcloud.ibsnet.co.jp/api/search?zipcode=';
      let result = await axios.get(url + zipcode);
      let address = result.data.results[0]
      this.prefecture = address.address1
      this.city = address.address2 + address.address3
    }
  },
}

</script>

<style scoped>
.wrapper {
  background-color: #fff;
}

.form-wrapper {
  width: 750px;
  padding: 20px 50px;
  margin: 50px auto 0;
  border: 3px #000 solid;
}

.form-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

.form-item-post,
.form-item-prefecture {
  display: flex;
  align-items: center;
  margin-bottom: 40px;
}

.form-label,
.form-label-post {
  display: block;
  width: 110px;
  padding: 10px;
  /* height: 40px; */
  /* font-size: 18px; */
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
.input-prefecture {
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
.input-zipcode {
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

.register-btn {
  width: 110px;
  height: 40px;
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  background-color: #3F89CD;
  border: none;
  border-radius: 5px;
}
</style>