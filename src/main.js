import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase";

createApp(App).use(store).use(router).mount('#app')

if (!firebase.apps.length) {
  firebase.initializeApp({
  apiKey: "AIzaSyDzh_aSLPWIllJylQTaEt0XQS5xxC4z4aA",
  authDomain: "fir-dorachan.firebaseapp.com",
  projectId: "fir-dorachan",
  storageBucket: "fir-dorachan.appspot.com",
  messagingSenderId: "435062382990",
  appId: "1:435062382990:web:2ed654adc1ae28bb0184df",
  measurementId: "G-1C93ZB2L59"
  });
}

export default firebase;