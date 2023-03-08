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
              <th>お気に入り一覧</th>
            </tr>
            <tr>
            <ul v-for="item in likedItem" :key="item">
              <td>
                <diagnosis-item :name="item.name" :diagnoses="item"></diagnosis-item>
                <like-component :diagnosisItem="item"></like-component>
              </td>
            </ul>
            </tr>
          </table>
        </div>
        <div class="result-wrapper">
          <table>
            <tr>
              <th>診断結果一覧</th>
            </tr>
            <template v-for="result in results" :key="result">
            <tr>
              <td>
                <p>{{ result[0].name }}</p>
                <button @click="resultPage(result[0].characters[0])">結果を見る</button>
                

              </td>
              
            </tr>
            </template>
          </table>
        </div>
        <div class="detail-wrapper">
          <table>
            <tr>
              <th>購入詳細</th>
            </tr>
            <tr>
              <td>
                <p>ドラえもんステッカー</p>
                <button>詳細を見る</button> 
              </td>
            </tr>
          </table>
        </div>
      </div>
      <!-- <p>{{ likedItem }}</p> -->
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
        // console.log(this.$store.getters.user.displayName)
        this.userName = this.$store.getters.user.displayName
        this.userUid = this.$store.getters.user.uid
        axios.get("http://localhost:8000/api/v1/diagnosis/" + this.userUid).then((res) => {
          this.likedItem = res.data.data
        });
        axios.get("http://localhost:8000/api/v1/result/" + this.userUid).then((res) => {
          console.log(res.data.data)
          this.results = res.data.data;
        });
      });
      
    // firebaseUtils.onAuthStateChanged();
  },
  components: {
    'diagnosis-item': Diagnosis,
    'like-component': Like,
    // 'my-result': Result,
  },
  mounted() {
  },
  data() {
    return {
      userUid: '',
      userName: '',
      likedItem: [],
      results: [],
      diagnosis: [],
      characters: [],
      test: []
    }
  },
  methods: {
    resultPage(item) {
      console.log(item)
      this.$store.commit('diagnoses/setMyResults', item);
      this.$router.push('/my-result');
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
  /* margin-left: 600px; */
}
.home-btn {
  background-color: #D1DA6D;
  border: 1px solid #D1DA6D;
}
.main-wrapper {
  background-color: #fff;
}
.sub-wrapper {
  display: flex;
  justify-content: space-around;
}
ul {
  list-style: none;
}

</style>