import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)

const vuexLocal = new VuexPersist({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    steamID: "",
    multiHash: false,
    database: ""
  },
  mutations: {
    setSteamID(state, steamID) {
      state.steamID = steamID;
    },
    setMultiHash(state, value) {
      state.multiHash = value;
    },
    setDatabase(state, value) {
      state.database = value;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
