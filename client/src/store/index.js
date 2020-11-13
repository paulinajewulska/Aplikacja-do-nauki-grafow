import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import { BootstrapVue } from "bootstrap-vue";
Vue.use(BootstrapVue);

export default new Vuex.Store({
  state: {
    baseURL: process.env.VUE_APP_SERVER_URI,
    navigationList: [],
    lessonsList: [],
    //  canvas graph
    isWeighted: false,
    isDirected: false
  },
  getters: {
    getBaseURL: state => state.baseURL,
    getNavigationList: state => state.navigationList,
    getLessonsList: state => state.lessonsList,
    isWeighted: state => state.isWeighted,
    isDirected: state => state.isDirected
  },
  mutations: {
    saveNavigationList(state, navigationList) {
      state.navigationList = navigationList;
    },
    saveLessonsList(state, lessonsList) {
      state.lessonsList = lessonsList[0].topics;
    },
    toggleIsWeighted(state) {
      state.isWeighted = !state.isWeighted;
    },
    toggleIsDirected(state) {
      state.isDirected = !state.isDirected;
    }
  },
  actions: {
    loadNavigationList: async ({ commit, state }) => {
      const response = await fetch(`${state.baseURL}/categories`, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        }
      });
      const categories = await response.json();
      commit("saveNavigationList", categories);
    },
    loadLessonsList: async ({ commit, state }, payload) => {
      const response = await fetch(
        `${state.baseURL}/categories/${payload.category}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      );
      const lessons = await response.json();
      commit("saveLessonsList", lessons);
    }
  }
});
