export default {
  namespaced: true,
  state: {
    firstName: '',
    lastName: '',
    firstZipcode: '',
    lastZipcode: '',
    prefecture: '',
    city: '',
    building: '',
    date: '',
    time: '',
    tokenId: '',
  },
  getters: {
    
  },
  mutations: {
    setFirstName(state, payload) {
      state.firstName = payload;
    },
    setLastName(state, payload) {
      state.lastName = payload;
    },
    setFirstZipcode(state, payload) {
      state.firstZipcode = payload;
    },
    setLastZipcode(state, payload) {
      state.lastZipcode = payload;
    },
    setPrefecture(state, payload) {
      state.prefecture = payload;
    },
    setCity(state, payload) {
      state.city = payload;
    },
    setBuilding(state, payload) {
      state.building = payload;
    },
    setTokenId(state, payload) {
      state.tokenId = payload;
    },
    setDate(state, payload) {
      state.date = payload;
    },
    setTime(state, payload) {
      state.time = payload;
    },
  },
  actions: {
  },
  modules: {
  },
}
