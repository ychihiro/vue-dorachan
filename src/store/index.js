import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import diagnoses from './modules/diagnoses'
import purchase from './modules/purchase'

export default createStore({
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
    diagnoses, purchase
  },
  plugins: [createPersistedState(
    { 
      key: 'doraApp',
      paths: ['diagnoses.id', 'diagnoses.characters', 'diagnoses.questions', 'diagnoses.results', 'diagnoses.carts', 'purchase.firstName', 'purchase.lastName', 'purchase.firstZipcode', 'purchase.lastZipcode', 'purchase.prefecture', 'purchase.city', 'purchase.building', 'purchase.tokenId', 'purchase.date', 'purchase.time'],
      storage: window.sessionStorage
    }
  )]
})
