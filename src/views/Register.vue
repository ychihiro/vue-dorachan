<template>
  <div class="register">
    <!-- <div class="email"></div> -->
    <label>メールアドレス
    <input type="email" v-model="email" placeholder="nobi@nobita">
    </label>
    <label>パスワード
    <input type="password" v-model="password" placeholder="nobinobita">
    </label>
    <button @click="register">登録</button>
  </div>
</template>

<script>
import firebase from '../main';
export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    register() {
      if (!this.email || !this.password) {
        alert("メールアドレスまたはパスワードが入力されていません。");
        return;
      }
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then((data) => {
          data.user.sendEmailVerification().then(() => {
            this.$router.replace("/");
            alert("登録が完了しました");
          });
        })
        .catch((error) => {
          switch (error.code) {
            case "auth/invalid-email":
              alert("メールアドレスの形式が違います。");
              break;
            case "auth/email-already-in-use":
              alert("このメールアドレスはすでに使われています。");
              break;
            case "auth/weak-password":
              alert("パスワードは6文字以上で入力してください。");
              break;
            default:
              alert("エラーが起きました。しばらくしてから再度お試しください。");
              break;
          }
        });
    }
  }
}
</script>

<style scoped>
.register {
  background-color: #fff;
  width: 250px;
  padding: 20px 30px;
  margin: 0 auto;
  border-radius: 10px;
}

label {
  /* border: 2px solid red; */
  display: block;
  text-align: left;
  margin-bottom: 30px;
}

input {
  width: 100%;
  height: 30px;
  border-radius: 5px;
}
</style>