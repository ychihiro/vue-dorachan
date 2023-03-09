<template>
  <div class="header">
    <router-link to="/register" class="head-register-btn" v-if="isLogin === false">新規登録</router-link>
    <router-link to="/login" class="head-login-btn" v-if="isLogin === false">ログイン</router-link>
    <router-link to="/logout" @click="logout" class="head-register-btn" v-if="isLogin === true">ログアウト</router-link>
    <router-link to="/mypage" class="head-login-btn" v-if="isLogin === true">マイページ</router-link>
    <h1 v-if="this.$store.getters.isLogin">ログイン中</h1>
  </div>
</template>

<script>
import firebase from '../main';

export default {
  name: 'Header',
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
.head-register-btn,
.head-login-btn {
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 15px;
  cursor: pointer;
  color: #fff;
  background-color: #D1DA6D;
}
</style>