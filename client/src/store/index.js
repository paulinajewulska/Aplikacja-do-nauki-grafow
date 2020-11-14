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
    isDirected: false,
    vertexList: [{ id: 0, x: 50, y: 50 }],
    addVertexOption: false
  },
  getters: {
    getBaseURL: state => state.baseURL,
    getNavigationList: state => state.navigationList,
    getLessonsList: state => state.lessonsList,
    isWeighted: state => state.isWeighted,
    isDirected: state => state.isDirected,
    vertexList: state => state.vertexList,
    addVertexOption: state => state.addVertexOption,
    availableId: state => {
      if (state.vertexList.length) {
        return (
          state.vertexList.reduce(
            (max, v) => (v.id > max ? v.id : max),
            state.vertexList[0].id
          ) + 1
        );
      } else return 0;
    },
    vertexNumber: state => state.vertexList.length
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
    },
    addVertex(state, vertex) {
      state.vertexList.push(vertex);
    },
    toggleAddVertexOption(state) {
      state.addVertexOption = !state.addVertexOption;
    },
    deleteAll(state) {
      state.vertexList = [];
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
    },
    addVertex: ({ commit, state }, payload) => {
      if (state.vertexList.some(v => v.id === payload.vertex.id)) {
        throw `Vertex with ${payload.vertex.id} id already exists.`;
      }
      commit("addVertex", payload.vertex);
    }
  }
});
