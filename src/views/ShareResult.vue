<template>
  <div class="header">
    <router-link to="/result" class="head-btn">戻る</router-link>
  </div>
  <div class="wrapper">
  <VueQrcode :value="url" :options="{ width: 300 }"></VueQrcode>
  <p class="description">QRコードから結果が見れるよ！チェックしてみよう！</p>
  </div>
</template>

<script>
import firebase from '../main';
import VueQrcode from "@chenfengyuan/vue-qrcode";

export default {
  components: {
    VueQrcode,
  },
  data() {
    return {
      url: 'http://localhost:8080/result'
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push('/');
          alert('成功');
          this.$store.commit('reset');
        })
        .catch(() => {
          alert('ログアウトに失敗しました')
        });
    }
  },
}
</script>

<style scoped>
.header {
  padding: 15px;
}
.head-btn {
  margin-left: 10px;
  background-color: #D1DA6D;
  border: 1px solid #D1DA6D;
}
.wrapper {
  padding: 150px;
}
.description {
  margin-top: 20px;
  font-size: 20px;
  color: #fff;
}
</style>