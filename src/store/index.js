import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist';

Vue.use(Vuex)

const vuexLocal = new VuexPersist({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    steamID: null,
    multiHash: false
  },
  mutations: {
    setSteamID(state, steamID) {
      state.steamID = steamID;
    },
    setMultiHash(state, value) {
      state.multiHash = value;
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
