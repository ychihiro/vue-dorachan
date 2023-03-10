function getDefaultState() {
  return {
    carts: [],
    presentItem: '',
    firstName: '',
    lastName: '',
    zipcode: '',
    prefecture: '',
    city: '',
    building: '',
    date: '',
    time: '',
    tokenId: '',
    myItemDetails: []
  }
}

export default {
  namespaced: true,
  state: getDefaultState,
  getters: {
    
  },
  mutations: {
    setPresentItem(state, payload) {
      state.presentItem = payload
    },
    setCarts(state, payload) {
      state.carts = payload
    },
    setFirstName(state, payload) {
      state.firstName = payload;
    },
    setLastName(state, payload) {
      state.lastName = payload;
    },
    setZipcode(state, payload) {
      state.zipcode = payload;
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
    setMyItemDetails(state, payload) {
      state.myItemDetails = payload;
    },
    reset(state) {
      Object.assign(state, getDefaultState())
    },
  },
}
