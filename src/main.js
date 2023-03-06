import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from "firebase";
// import firebaseConfig from './path/to/your/firebaseConfig';
// import axios from 'axios';

createApp(App).use(store).use(router).mount('#app')
// app.config.productionTip = false;

if (!firebase.apps.length) {
  firebase.initializeApp({
  apiKey: "AIzaSyDzh_aSLPWIllJylQTaEt0XQS5xxC4z4aA",
  authDomain: "fir-dorachan.firebaseapp.com",
  projectId: "fir-dorachan",
  storageBucket: "fir-dorachan.appspot.com",
  messagingSenderId: "435062382990",
  appId: "1:435062382990:web:2ed654adc1ae28bb0184df",
  });
}


// const firebaseConfig = {
//   apiKey: "AIzaSyDzh_aSLPWIllJylQTaEt0XQS5xxC4z4aA",
//   authDomain: "fir-dorachan.firebaseapp.com",
//   projectId: "fir-dorachan",
//   storageBucket: "fir-dorachan.appspot.com",
//   messagingSenderId: "435062382990",
//   appId: "1:435062382990:web:2ed654adc1ae28bb0184df",
//   measurementId: "G-1C93ZB2L59"
// };
// initializeApp(firebaseConfig);
firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)

export default firebase;