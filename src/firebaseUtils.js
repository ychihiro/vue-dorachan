import firebase from "firebase";
import store from './store';

export default {
  onAuthStateChanged() {
    firebase.auth().onAuthStateChanged(u => {
      let user = u ? u : {};
      store.commit('onAuthStateChanged', user);
      store.commit('onUserLoginStatusChanged', user.uid ? true : false);
    }) 
  }
}