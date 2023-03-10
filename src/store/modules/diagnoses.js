export default {
  namespaced: true,
  state: {
    id: '',
    characters: [],
    questions: [],
    evalueation: false,
    results: [],
    myResults: [] 
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
    setEvalueation(state, payload) {
      state.evalueation = payload;
    },
    setResults(state, payload) {
      state.results = payload
    },
    setMyResults(state, payload) {
      state.myResults = payload
    },
    
  },
  actions: {
  },
  modules: {
  },
}
