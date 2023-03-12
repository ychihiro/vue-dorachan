<template>
  <div class="header">
    <router-link to="/register" class="head-btn" v-if="isLogin === false">新規登録</router-link>
    <router-link to="/login" class="head-btn" v-if="isLogin === false">ログイン</router-link>
    <router-link to="/logout" @click="logout" class="head-btn" v-if="isLogin === true">ログアウト</router-link>
    <router-link to="/mypage" class="head-btn" v-if="isLogin === true">マイページ</router-link>
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
          this.$store.commit('reset');
        })
        .catch(() => {
          alert('ログアウトに失敗しました');
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