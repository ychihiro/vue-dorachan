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
// import axios from 'axios';
import firebase from '../main';
import firebaseUtils from './../firebaseUtils';
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    ...mapActions(['setUser']),
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          // const user = data.this;
          // this.setUser(user);
          // console.log(this.$store.state.user);
          firebaseUtils.onAuthStateChanged(data);
          alert('ログインが完了しました')
          this.$router.push('/thanks');
        })
        .catch((error) => {
          alert('ログインエラー');
          console.log(error);
        });
    }
  }
}
</script>