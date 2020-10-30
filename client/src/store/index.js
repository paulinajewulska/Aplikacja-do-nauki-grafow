import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { BootstrapVue } from "bootstrap-vue";
Vue.use(BootstrapVue);

export default new Vuex.Store({
  state: {
    baseURL: process.env.VUE_APP_SERVER_URI,
    navigationList: []
  },
  getters: {
    getBaseURL: state => state.baseURL,
    getNavigationList: state => state.navigationList
  },
  mutations: {
    saveNavigationList(state, navigationList) {
      state.navigationList = navigationList;
    }
  },
  actions: {
    loadNavigationList: async ({ commit, state }) => {
      const response = await fetch(`${state.baseURL}/category`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      const categories = await response.json();
      commit("saveNavigationList", categories);
    }
  }
});
