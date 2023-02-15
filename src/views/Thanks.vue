<template>
  <div>
    <h2>{{message}}ありがとうございました</h2>
    <button>ログイン</button>
    <p>{{ this.$store.state.user }}</p>
    <p>{{ this.$store.getters.user.uid }}</p>
    <p>{{ useremail }}</p>
    <p>{{ apple }}</p>
    <!-- <p>{{ useruid }}</p> -->
  </div>
</template>

<script>
import firebase from '../main';
// import firebaseUtils from './../firebaseUtils';
export default {
  created() {
    //ログイン中の認証情報を取得する
    
    firebase.auth().onAuthStateChanged(function (user) {
      
        // this.useruid = user.uid
        console.log('ログイン中！')
        this.apple = 'りんご'
        this.useremail = user.email
        console.log(user.uid)
        console.log(user.email)
      
      
    })
    // firebaseUtils.onAuthStateChanged();
    // console.log('成功！')
    //     console.log(this.$store.getters.isLogin);
    //     console.log(this.$store.getters.user.email);
    //     console.log(this.$store.getters.user.uid);
    // firebase
    //   .auth()
    //   .onAuthStateChanged(u => {
    //     let user = u ? u : {};
    //     console.log(user)
    //     this.$store.commit('onAuthStateChanged', user);
    //     this.$store.commit('onUserLoginStatusChanged', user.uid ? true : false);
    //     console.log(this.$store.getters.isLogin);
    //     console.log(this.$store.getters.user.email);
    //     console.log(this.$store.getters.user.uid);
    //   })    
  },
  data() {
    return {
      message: "ログイン",
      useremail: '',
      apple: ''
      // useruid: '',
    }
  }
}
</script>