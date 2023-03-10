<template>
  <div class="header">
    <router-link to="/" class="head-btn">ホーム</router-link>
    <router-link to="/product" class="head-btn" v-if="isLogin === true">商品を見る</router-link>
  </div>
</template>

<script>
import firebase from '../main';

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
</style>