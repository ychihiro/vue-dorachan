<template>
  <div class="header">
    <router-link to="/register" class="head-register-btn" v-if="isLogin === false">新規登録</router-link>
    <router-link to="/login" class="head-login-btn" v-if="isLogin === false">ログイン</router-link>
    <router-link to="/logout" class="head-register-btn" v-if="isLogin === true">ログアウト</router-link>
    <router-link to="/mypage" class="head-login-btn" v-if="isLogin === true">マイページ</router-link>
  </div>
</template>

<script>
export default {
  name: 'Header',
  computed: {
    isLogin() {
      return this.$store.getters.isLogin;
    }
  }
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