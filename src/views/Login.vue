<template>
  <Header></Header>
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
import Header from '@/components/Header.vue'
// import { mapActions } from 'vuex';

export default {
  components: {
    Header
  },
  data() {
    return {
      email: '',
      password: '',
    };
  },
  created() {
    this.test();
  },
  methods: {
    test() { 
      firebase.firestore().collection('admin_user').get()
        .then ((data) => {
          console.log(data)
          console.log('成功')
        })
        .catch((error) => {
            alert('ログインエラー');
            console.log(error);
          });
    },
    // ...mapActions(['setUser']),
    login() {
      if (!this.email || !this.password) {
        alert('メールアドレスまたはパスワードが入力されていません。')
        return
      }

      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          alert('ログインが完了しました')
          console.log(data.user)
          firebaseUtils.onAuthStateChanged();
          alert('login success');
          // this.$router.push('/');
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