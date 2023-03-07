<template>
  <h2>マイページ</h2>
  <p>ようこそ{{  }}さん</p>
</template>

<script>
import firebase from '../main';
// import firebaseUtils from './../firebaseUtils';

export default {
  created() {
    firebase
      .auth()
      .onAuthStateChanged(u => {
        let user = u ? u : {};
        this.$store.commit('onAuthStateChanged', user);
        this.$store.commit('onUserLoginStatusChanged', user.uid ? true : false);
        this.userUid = this.$store.getters.user.uid
      })
    // firebaseUtils.onAuthStateChanged();
  },
  data() {
    return {
      
    }
  },
}


</script>