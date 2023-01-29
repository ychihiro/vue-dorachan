<template>
  <div class="header">
    <router-link to="/register" class="register-btn" v-if="isLogin === false">新規登録</router-link>
    <router-link to="/login" class="login-btn" v-if="isLogin === false">ログイン</router-link>
    <router-link to="/logout" class="register-btn" v-if="isLogin === true">ログアウト</router-link>
    <router-link to="/mypage" class="login-btn" v-if="isLogin === true">マイページ</router-link>
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
.header {
  display: flex;
  justify-content: right;
  padding: 20px 10px;
  border: 2px solid #000;
}

.register-btn,
.login-btn {
  padding: 5px 10px;
  margin-left: 10px;
  border-radius: 15px;
  cursor: pointer;
  color: #fff;
  background-color: #D1DA6D;
}
</style>