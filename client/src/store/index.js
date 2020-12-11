import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { BootstrapVue } from "bootstrap-vue";

Vue.use(BootstrapVue);

import edge from "./modules/edge";

export default new Vuex.Store({
  state: {
    baseURL: process.env.VUE_APP_SERVER_URI,
    navigationList: [],
    lessonsList: [],
    lesson: {},
    //  canvas graph
    isWeighted: false,
    isDirected: false,
    vertexList: [],
    addVertexOption: false,
    deleteVertexOption: false,
    categoryUrl: null,
    lessonUrl: null
  },
  getters: {
    getBaseURL: state => state.baseURL,
    navigationList: state => state.navigationList,
    getLessonsList: state => state.lessonsList,
    lesson: state => state.lesson,
    isWeighted: state => state.isWeighted,
    isDirected: state => state.isDirected,
    vertexList: state => state.vertexList,
    addVertexOption: state => state.addVertexOption,
    availableVertexId: state => {
      if (state.vertexList.length) {
        return (
          state.vertexList.reduce(
            (max, v) => (v.id > max ? v.id : max),
            state.vertexList[0].id
          ) + 1
        );
      } else return 0;
    },
    vertexNumber: state => state.vertexList.length,
    deleteVertexOption: state => state.deleteVertexOption,
    categoryUrl: state => state.categoryUrl,
    lessonUrl: state => state.lessonUrl,
    getVertexByID: (state, id) => state.vertexList.find(v => v.id === id)
  },
  mutations: {
    saveNavigationList(state, navigationList) {
      state.navigationList = navigationList;
    },
    saveLessonsList(state, lessonsList) {
      state.lessonsList = lessonsList[0].lessons;
    },
    saveLesson(state, lesson) {
      state.lesson = lesson;
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
      if (state.deleteVertexOption) {
        state.deleteVertexOption = false;
      }
      state.addVertexOption = !state.addVertexOption;
    },
    deleteVertex(state, id) {
      state.vertexList.splice(
        state.vertexList.findIndex(v => v.id === id),
        1
      );
    },
    toggleDeleteVertexOption(state) {
      if (state.addVertexOption) {
        state.addVertexOption = false;
      }
      state.deleteVertexOption = !state.deleteVertexOption;
    },
    deleteAll(state) {
      if (state.deleteVertexOption) {
        state.deleteVertexOption = false;
      }
      state.vertexList = [];
    },
    saveCategoryUrl(state, category) {
      state.categoryUrl = category;
    },
    saveLessonUrl(state, lesson) {
      state.lessonUrl = lesson;
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
    setCurrentRoute: async ({ commit }, payload) => {
      const currentCategory = payload.category || null;
      const currentLesson = payload.lesson || null;

      commit("saveCategoryUrl", currentCategory);
      commit("saveLessonUrl", currentLesson);
    },
    loadLesson: async ({ commit, state }) => {
      const response = await fetch(
        `${state.baseURL}/categories/${state.categoryUrl}/${state.lessonUrl}`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        }
      );
      const lesson = await response.json();
      commit("saveLesson", lesson);
    },
    addVertex: ({ commit, state }, payload) => {
      if (state.vertexList.some(v => v.id === payload.vertex.id)) {
        throw `Vertex with ${payload.vertex.id} id already exists.`;
      }
      commit("addVertex", payload.vertex);
    },
    deleteVertex: ({ commit, state }, payload) => {
      if (!state.vertexList.some(v => v.id === payload.vertex.id)) {
        throw `Vertex with ${payload.vertex.id} id does not exist.`;
      }
      commit("removeVertex", payload.id);
    }
  },
  modules: { edge }
});
