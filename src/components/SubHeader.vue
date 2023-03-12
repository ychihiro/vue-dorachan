<template>
  <div class="header">
    <router-link to="/" class="head-btn" @click="move">ホーム</router-link>
  </div>
</template>

<script>
import firebase from '../main';
import axios from 'axios';

export default {
  name: 'HeaderSecond',
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    }
  },
  methods: {
    logout() {
      firebase.auth().signOut()
        .then(() => {
          this.$router.push('/');
          this.$store.commit('reset');
        })
        .catch(() => {
          alert('ログアウトに失敗しました')
        });
    },
    async move() {
      this.$store.commit('purchase/reset');
      this.$store.commit('diagnoses/reset');
      const cartBox = await axios.get("http://localhost:8000/api/v1/cart");
      cartBox.data.forEach(element => {
        axios.delete("http://localhost:8000/api/v1/cart/all-delete/" + element.product_id);
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
</style>