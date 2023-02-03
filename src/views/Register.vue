<template>
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
</template>

<script>
// import axios from 'axios';
import firebase from 'firebase';
export default {
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
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            this.$router.replace("/confirm");
            console.log(data)
          });
        });
      // axios
      //   .post("http://localhost:8000/api/v1/user",
      //     {
      //       name: this.userName,
      //       email: this.email,
      //       password: this.password,
      //       uuid: this.uid
      //     })
      //   .then((response) => (this.info = response))
      //   .then((response) => console.log(response))
      //   .catch((error) => {
      //     console.log(error);
      //   })
    },
  },
};
</script>

