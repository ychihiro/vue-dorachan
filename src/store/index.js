import { createStore } from 'vuex'
import diagnoses from './modules/diagnoses'

export default createStore({
  strict: true,
  state: {
    user: {},
    isLogin: false,
  },
  getters: {
    // isAuthenticated(state) {
    //   return !!state.user;
    // },
    user(state) {
      return state.user;
    },
    isLogin(state) {
      return state.isLogin;
    }
  },
  mutations: {
    // setUser(state, user) {
    // state.user = user
    // },
    onAuthStateChanged(state, user) {
      state.user = user;
    },
    onUserLoginStatusChanged(state, isLogin) {
      state.isLogin = isLogin;
    }
  },
  actions: {
  // setUser(context, user) {
  //   context.commmit('setUser', user)
  // },
  },
  modules: {
    diagnoses
  }
})
