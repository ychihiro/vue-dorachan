import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import diagnoses from './modules/diagnoses'
import purchase from './modules/purchase'

function getDefaultState() {
  return {
    user: {},
    isLogin: false,
    addminUser: false,
    createUser: false,
  }
}

export default createStore({
  state: getDefaultState,
  getters: {
    user(state) {
      return state.user;
    },
    isLogin(state) {
      return state.isLogin;
    }
  },
  mutations: {
    onAuthStateChanged(state, user) {
      state.user = user;
    },
    onUserLoginStatusChanged(state, isLogin) {
      state.isLogin = isLogin;
    },
    onUserAddminStatusChanged(state, addminUser) {
      state.addminUser = addminUser;
    },
    onUserCreateStatusChanged(state, createUser) {
      state.createUser = createUser;
    },
    reset(state) {
      Object.assign(state, getDefaultState())
    },
  },
  actions: {
  },
  modules: {
    diagnoses, purchase
  },
  plugins: [createPersistedState(
    { 
      key: 'doraApp',
      paths: ['isLogin', 'addminUser', 'createUser','diagnoses.id', 'diagnoses.characters', 'diagnoses.questions', 'diagnoses.evalueation', 'diagnoses.results', 'diagnoses.myResults', 'purchase.presentItem', 'purchase.carts', 'purchase.firstName', 'purchase.lastName', 'purchase.zipcode', 'purchase.prefecture', 'purchase.city', 'purchase.building', 'purchase.tokenId', 'purchase.date', 'purchase.time', 'purchase.myItemDetails'],
      storage: window.sessionStorage
    }
  )]
})
