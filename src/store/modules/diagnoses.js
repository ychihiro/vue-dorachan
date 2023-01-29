import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'


export default createStore({
  state: {
    id: '',
    characters: [],
    questions: [],
    userscore: [],
    result: null
  },
  getters: {
    
  },
  mutations: {
    setId(state, payload) {
      state.id = payload;
    },
    setCharacters(state, payload) {
      state.characters = payload;
    },
    setQuestions(state, payload) {
      state.questions = payload;
    },
    setUserScore(state, payload) {
      state.userscore = payload;
    }
  },
  actions: {
    setId(context, payload) {
      context.commit('setId', payload);
    },
    setCharacters(context, payload) {
      context.commit('setCharacters', payload);
    },
    setQuestions(context, payload) {
      context.commit('setQuestions', payload);
    },
    setUserScore(context, payload) {
      context.commit('setUserScore', payload);
    }
  },
  modules: {
  },
  plugins: [createPersistedState(
    { 
      key: 'dorachanApp',
      paths: ['id', 'characters', 'questions'],
      storage: window.sessionStorage
    }
  )]
})
