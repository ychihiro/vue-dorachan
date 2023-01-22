<template>
  <div class="login">
    <label>メールアドレス
      <input type="email" v-model="email" placeholder="nobi@nobita.com">
    </label>
    <label>パスワード
      <input type="password" v-model="password" placeholder="nobinobita">
    </label>
    <button @click="login">ログイン</button>
  </div>
</template>

<script>
import axios from 'axios';
// import firebase from '../main';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    login() {
      axios
      .show
    }
  },
}
</script>