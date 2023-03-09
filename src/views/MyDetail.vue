<template>
  <h1>商品詳細ページ</h1>
  <p>{{ itemDetails }}</p>
  <table>
  <tr>
    <th>商品名</th>
    <th>商品イメージ</th>
    <th>個数</th>
    <th>価格</th>
    <th>小計</th>
    </tr>
    <tr>
    <!-- <template v-for="item in itemDetails" :key="item"> -->
    <!-- {{ item.id }} -->
    <td>{{ itemDetails.product.name }}</td>
    <td>
    <div>
    <img :src="'http://localhost:8000/storage/' + itemDetails.product.path" alt="">
    </div>
    </td>
    <td>{{ itemDetails.count }}</td>
    <td>{{ itemDetails.product.price }}</td>
    <td>{{ itemDetails.count * itemDetails.product.price }}</td>
    </tr> 
  </table>

  <div class="form-wrapper">
        <h2 class="ttl">配達先住所</h2>
        <div class="form-item">
          <label class="form-label">氏名</label>
          <input type="text" v-model="fullname" :placeholder="itemDetails.fullname" class="input-name">
        </div>
        <div class="form-item-post">
        <label class="form-label-post">郵便番号</label>
        <span>〒</span>
        <input type="number" v-model="firstZipcode" :placeholder="itemDetails.postcode" class="input-zipcode">
        <span>ー</span>
        <input type="number" v-model="lastZipcode" placeholder="0076
        " class="input-zipcode">
        <button @click="searchAddress" class="search-address">住所検索</button>
        </div>
        <div class="form-item">
          <label class="form-label">都道府県</label>
          <input type="text" v-model="prefecture" :placeholder="itemDetails.prefecture" class="input-prefecture">
        </div>
        <div class="form-item">
          <label class="form-label">市区町村</label>
          <input type="text" v-model="city" :placeholder="itemDetails.city" class="input-city">
        </div>
        <div class="form-item">
          <label class="form-label">建物名</label>
          <input type="text" v-model="building" :placeholder="itemDetails.building_name" class="input-building">
        </div>
      </div>
      <div class="form-wrapper">
        <h2>お届け日時</h2>
        <div class="form-item">
          <label class="form-label">配達希望日</label>
          <input type="date" v-model="date" class="input-date">
          <p>{{ itemDetails.delivery_date }}</p>
        </div>
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
          <p>{{ itemDetails.delivery_time }}</p>
        </div>
      </div>
      <button @click="change">変更する</button>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      itemDetails: this.$store.state.purchase.myItemDetails,
      fullname: '',
      firstZipcode: '',
      lastZipcode: '',
      prefecture: '',
      city: '',
      building: '',
      date: '',
      time: ''
    }
  },
  methods: {
    async change() {
      await axios.put("http://localhost:8000/api/v1/purchase/" + this.itemDetails.id, {
        fullname: this.fullname,
        postcode: this.firstZipcode + '' + this.lastZipcode,
        prefecture: this.prefecture,
        city: this.city ,
        building_name: this.building,
        delivery_date: this.date,
        delivery_time: this.time,
      }).then((res) => {
        console.log(res.data);
      });
    }
  },
}
</script>