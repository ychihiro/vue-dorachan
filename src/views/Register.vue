<template>
  <Header></Header>
  <div class="register">
<label class="username">ユーザーネーム
<input type="text" v-model="userName" placeholder="のび太">
</label>
<label class="email">メールアドレス
<input type="email" v-model="email" placeholder="nobi@nobita.com">
</label>
<label class="password">パスワード
<input type="password" v-model="password" placeholder="nobinobita">
</label>
<button @click="register">登録</button>
  </div>
  <div>{{ userName }}</div>
  <div>{{ email }}</div>
  <div>{{ password }}</div>
  <div>{{ uid }}</div>
</template>


<script>
import axios from 'axios';
import firebase from 'firebase';
import Header from '@/components/Header.vue';
export default {
  components: {
    Header,
  },
  data() {
return {
  userName: '',
  email: '',
  password: '',
  uid: '',
};
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((userCredential) => {
          this.sendEmail(this.email)
          // userCredential.user.sendEmailVerification().then(() => {
          //   console.log('確認メール送信')
          // });
          userCredential.user.updateProfile({
            displayName: this.userName
          })
          this.uid = userCredential.user.uid;
          console.log(this.userName);
          console.log(this.uid);
          // console.log(userCredential);
          axios
            .post("http://localhost:8000/api/v1/user",
              {
                name: this.userName,
                email: this.email,
                password: this.password,
                id: this.uid
              })
            // .then((response) => (this.info = response))
            .then((response) => console.log(response))
            .catch((error) => {
              console.log(error);
            })
            // this.$router.push('/login')
        })
        // });
    },
    sendEmail() {
      const actionUri = {
        url: 'http://localhost:8080/login'
      };
      firebase.auth().languageCode = "ja";
      const user = firebase.auth().currentUser;
      user
        .sendEmailVerification(actionUri)
        .then(() => alert("認証メールを送りました!"))
        .catch((e) => console.log(e));
    }
  },
};
</script>

