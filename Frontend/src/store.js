import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null,
    covids: [],
  },
  mutations: {
    set_user: (state, user) => state.user = user,
    set_covids: (state, covids) => state.covids = covids,
  },
  actions: {
    get_user_login: ({ commit }) => Axios.post('/api/account/getUserLogin').then(res => commit('set_user', res.data)),
    set_covids: ({ commit }) => Axios.get('/api/covid').then(res => commit('set_covids', res.data)),
  }
})
