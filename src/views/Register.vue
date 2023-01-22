<template>
  <div class="register">
<label class="username">ユーザーネーム
<input type="text" v-model="name" placeholder="のび太">
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
import axios from 'axios';
import firebase from 'firebase';
export default {
  data() {
return {
  name: '',
  email: '',
  password: '',
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
          });
        });
      axios
        .post("http://localhost:8000/api/v1/user",
          {
            name: this.name,
            email: this.email,
            password: this.password
        })
        .then((response) => (this.info = response))
        .then(alert('成功しました！！！'));
    },
  },
};
</script>

