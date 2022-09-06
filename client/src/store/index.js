import { createStore } from 'vuex'

export default createStore({
  state: {
    token: ''
  },
  mutations: {
    setToken(state, t) {
      state.token = t
    }
  },
  getters:{
    token: state =>{
      return state.token
    }
  },
  actions: {
  },
  modules: {
  }
})
