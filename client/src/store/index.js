import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate";

export default createStore({
  state: {
    token: null
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
  },
  plugins: [createPersistedState()],
})
