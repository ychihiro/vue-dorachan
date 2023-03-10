<template>
  <Header></Header>
  <div class="wrapper">
    <div class="register-wrapper">
      <Form>
      <label class="name-label">ユーザーネーム</label>
      <Field name="name" type="text" v-model="userName" placeholder="のび太" class="input-name" :rules="nameRules"/>
      <ErrorMessage name="name" class="error"/>
      <label class="mail-label">メールアドレス</label>
      <Field name="email" type="email" v-model="email" placeholder="nobi@nobita.com" class="input-mail" :rules="emailRules"/>
      <ErrorMessage name="email" class="error"/>
      <label class="password-label">パスワード</label>
      <Field name="password" type="password" v-model="password" placeholder="nobinobita" class="input-password" :rules="passwordRules"/>
      <ErrorMessage name="password" class="error"/>
      </Form>
      <button @click="register" class="register-btn">登録</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import firebase from 'firebase';
import Header from '@/components/HeaderSecond.vue';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from "yup";

export default {
  components: {
    Header,
    Field,
    Form,
    ErrorMessage
},
  data() {
return {
  userName: '',
  email: '',
  password: '',
  uid: '',
  nameRules: yup.string().required('※入力必須項目です').max(191, '※191文字以内で入力してください'),
  emailRules: yup.string().required('※入力必須項目です').matches(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/, '※無効なメールアドレスです').max(191, '※191文字以内で入力してください'),
  passwordRules: yup.string().required('※入力必須項目です').min(8, '※8文字以上で入力してください').max(191, '※191文字以内で入力してください')
};
  },
  methods: {
    register() {
      const name = this.userName;
      const email = this.email;
      const password = this.password;
      const format = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      const result = format.test(email)
      if (name !== '' && name.length <= 191 && email !== '' && email.length <= 191 && result && password !== '' && password.length <= 191 && password.length >= 8) {
        console.log('成功')
        firebase
          .auth()
          .createUserWithEmailAndPassword(this.email, this.password)
          .then((userCredential) => {
            // this.sendEmail(this.email)
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
                .then((response) => {
                console.log(response);
                // this.$router.push('/login');
              })
          })
          .catch((error) => {
            switch (error.code) {
              case "auth/email-already-in-use":
                alert("このメールアドレスはすでに使われています。");
                break;
              default:
                alert("エラーが起きました。しばらくしてから再度お試しください。");
                break;
            }
          });
        
              
          
      
          // })
      
    }
    // sendEmail() {
    //   const actionUri = {
    //     url: 'http://localhost:8080/login'
    //   };
    //   firebase.auth().languageCode = "ja";
    //   const user = firebase.auth().currentUser;
    //   user
    //     .sendEmailVerification(actionUri)
    //     .then(() => alert("認証メールを送りました!"))
    //     .catch((e) => console.log(e));
    }
  },
};
</script>

<style scoped>
.wrapper {
  padding: 70px 0px;
}
.register-wrapper {
  width: 28%;
  margin: 0 auto;
  padding: 40px 50px;
  border-radius: 10px;
  background-color: #fff;
}
.name-label,
.mail-label,
.password-label {
  display: block;
  padding: 10px;
  text-align: left;
  font-size: 20px;
}
.input-name,
.input-mail,
.input-password {
  width: 330px;
  height: 40px;
  font-size: 18px;
  padding: 5px 10px;
  border: 1px solid #999;
  border-radius: 5px;
  margin-bottom: 20px;
}
.register-btn {
  border: 1px solid #D1DA6D;
  background-color: #D1DA6D;
  margin-top: 20px;
}
</style>

