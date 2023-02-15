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
// import { mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    // ...mapActions(['setUser']),
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(() => {
          alert('ログインが完了しました')
          firebaseUtils.onAuthStateChanged();
          alert('login success');
          this.$router.push('/');
        })
        .catch((error) => {
          alert('ログインエラー');
          console.log(error);
        });
      // firebase
      //   .auth()
      //   .onAuthStateChanged(u => {
      //     let user = u ? u : {};
      //     console.log(user)
      //     this.$store.commit('onAuthStateChanged', user);
      //     this.$store.commit('onUserLoginStatusChanged', user.uid ? true : false);
      //   })        
    }
  }
}
</script>