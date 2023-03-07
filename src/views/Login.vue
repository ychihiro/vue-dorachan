<template>
  <Header></Header>
  <div class="wrapper">
    <div class="login-wrapper">
      <Form>
        <label class="mail-label">メールアドレス</label>
        <Field name="email" type="email" v-model="email" placeholder="nobi@nobita.com" class="input-mail" :rules="emailRules"/>
        <ErrorMessage name="email" class="error"/>
        <label class="password-label">パスワード</label>
        <Field name="password" type="password" v-model="password" placeholder="nobinobita" class="input-password" :rules="passwordRules"/>
        <ErrorMessage name="password" class="error"/>
      </Form>
      <button @click="login" class="login-btn">ログイン</button>
    </div>
  </div>
</template>

<script>
import firebase from '../main';
import firebaseUtils from './../firebaseUtils';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from "yup";
import Header from '@/components/Header.vue';

export default {
  components: {
    Header,
    Field,
    Form,
    ErrorMessage,
  },
  data() {
    return {
      email: '',
      password: '',
      test2: [],
      emailRules: yup.string().required('※入力必須項目です').matches(/^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/, '※無効なメールアドレスです').max(191, '※191文字以内で入力してください'),
      passwordRules: yup.string().required('※入力必須項目です').min(8, '※8文字以上で入力してください').max(191, '※191文字以内で入力してください')
    };
  },
  methods: {
    test() {
      firebase.firestore().collection('admin_user').get()
        .then((snap) => {
          const array = [];
          snap.forEach(doc => {
            array.push([doc.data(), doc.id]);
          });
          this.test2 = array
          console.log(this.test2)
        })
        .catch((error) => {
          alert('ログインエラー');
          console.log(error);
        });
    },
    login() {
      const email = this.email;
      const password = this.password;
      const format = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;
      const result = format.test(email)
      if (email !== '' && email.length <= 191 && result && password !== '' && password.length <= 191 && password.length >= 8) {
        firebase
          .auth()
          .signInWithEmailAndPassword(this.email, this.password)
          .then(() => {
            firebaseUtils.onAuthStateChanged();
            console.log('成功')
            this.$router.push('/');
          })
          .catch((error) => {
            alert('ログインエラー');
            console.log(error);
          });
        }    
    }
  }
}
</script>

<style scoped>
.wrapper {
  padding: 120px 0px;
}
.login-wrapper {
  width: 28%;
  margin: 0 auto;
  padding: 40px 50px;
  border-radius: 10px;
  background-color: #fff;
}
.mail-label,
.password-label {
  display: block;
  padding: 10px;
  text-align: left;
  font-size: 20px;
}

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
.login-btn {
  border: 1px solid #D1DA6D;
  background-color: #D1DA6D;
  margin-top: 20px;
}
</style>