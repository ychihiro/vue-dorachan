<template>
  <div class="head-wrapper">
    <h2 class="ttl">マイページ</h2>
    <div class="sub-head-wrapper">
      <p class="name">{{ userName }}さん</p>
      <router-link to="/" class="home-btn">ホーム</router-link>
    </div>
  </div>
  <div class="main-wrapper">
      <div class="sub-wrapper">
        <div class="favorite-wrapper">
          <table>
            <tr>
              <th class="table-ttl">お気に入り一覧</th>
            </tr>
            <tr>
            <ul v-for="item in likedItem" :key="item">
              <td class="item-row">
              <div class="item-wrapper">
                <diagnosis-item :name="item.name" :diagnoses="diagnoses">
                </diagnosis-item>
                <like-component :diagnosisItem="item"></like-component>
              </div>
              </td>
            </ul>
            </tr>
          </table>
        </div>
        <div class="result-wrapper">
          <table>
            <tr>
              <th class="table-ttl">診断結果一覧</th>
            </tr>
            <template v-for="result in results" :key="result">
            <tr>
              <td class="item-row">
                <p class="result-name">{{ result[0].name }}</p>
                <button @click="resultPage(result[0].characters[0])" class="result-btn">結果を見る</button>
              </td>
            </tr>
            </template>
          </table>
        </div>
        <div class="detail-wrapper">
          <table>
            <tr>
              <th class="table-ttl">購入詳細</th>
            </tr>
            <template v-for="product in products" :key="product">
            <tr>
              <td class="item-row">
                <p class="product-name">{{ product.product.name }}</p>
                <button @click="detailPage(product)" class="product-btn">詳細を見る</button> 
              </td>
            </tr>
            </template>
          </table>
        </div>
      </div>
  </div>
</template>

<script>
import firebase from '../main';
import axios from 'axios';
import Diagnosis from '@/components/DiagnosisItem.vue';
import Like from '@/components/Like.vue';

export default {
  async created() {
    firebase
      .auth()
      .onAuthStateChanged(u => {
        let user = u ? u : {};
        this.$store.commit('onAuthStateChanged', user);
        this.$store.commit('onUserLoginStatusChanged', user.uid ? true : false);
        this.userName = this.$store.getters.user.displayName;
        this.userUid = this.$store.getters.user.uid;
        axios.get("http://localhost:8000/api/v1/diagnosis/" + this.userUid).then((res) => {
          this.likedItem = res.data.data;
        });
        axios.get("http://localhost:8000/api/v1/result/" + this.userUid).then((res) => {
          this.results = res.data.data;
        });
        axios.get("http://localhost:8000/api/v1/purchase/" + this.userUid).then((res) => {
          this.products = res.data.data[0];
        })
      });
  },
  components: {
    'diagnosis-item': Diagnosis,
    'like-component': Like,
  },
  async mounted() {
    const response = await axios
      .get("http://localhost:8000/api/v1/diagnosis");
    this.diagnoses = response.data;
  },
  data() {
    return {
      userUid: '',
      userName: '',
      likedItem: [],
      results: [],
      diagnosis: [],
      characters: [],
      products: [],
    }
  },
  methods: {
    resultPage(item) {
      this.$store.commit('diagnoses/setMyResults', item);
      this.$router.push('/my-result');
    },
    detailPage(item) {
      this.$store.commit('purchase/setMyItemDetails', item)
      this.$router.push('/history');
    }
  },
}
</script>

<style scoped>
.head-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 10px 40px;
  border: 1px solid #000;
}
.sub-head-wrapper {
  display: flex;
  align-items: center;
}
.ttl {
  color: #fff;
}
.name {
  color: #fff;
  font-size: 20px;
  margin-right: 20px;
}
.home-btn {
  background-color: #D1DA6D;
  border: 1px solid #D1DA6D;
}
.main-wrapper {
  padding: 40px;
  background-color: #fff;
}
.sub-wrapper {
  display: flex;
  justify-content: center;
}
ul {
  list-style: none;
}
.table-ttl {
  width: 300px;
  padding: 10px;
  margin-top: 40px;
  color: #fff;
  background-color: #D1DA6D;
}
.item-wrapper {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
  border: 2px solid #CA8A8A;
  border-radius: 5px;
}
.item-row {
  width: 350px;
  height: 80px;
  padding: 10px;
  vertical-align: middle;
}
.result-name,
.product-name {
  cursor: pointer;
  font-size: 22px;
}
.result-btn,
.product-btn {
  padding: 5px 10px;
  color: #CA8A8A;
  font-size: 16px;
  border: 1px solid #CA8A8A;
  border-radius: 5px;
  background-color: #fff;
}
.result-btn:hover,
.product-btn:hover {
  color: #fff;
  background-color: #CA8A8A;
  font-weight: bold;
}

@media screen and (max-width:768px) {
  .main-wrapper {
    padding: 33% 0px;
  }
  .sub-wrapper {
    display: block;
    width: 500px;
    margin: 20px auto;
  }
  .table-ttl {
    width: 500px;
    padding: 35px;
    font-size: 26px;
  }
  .favorite-row,
  .result-row {
    margin-bottom: 100px;
  }
  .item-row {
    padding: 30px 70px;
  }
  .item-wrapper {
    padding: 20px;
  }
}
</style>