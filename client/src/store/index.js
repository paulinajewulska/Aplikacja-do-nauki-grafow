import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import { BootstrapVue } from "bootstrap-vue";

Vue.use(BootstrapVue);

import edge from "./modules/edge";
import vertex from "./modules/vertex";

export default new Vuex.Store({
  state: {
    baseURL: process.env.VUE_APP_SERVER_URI,
    navigationList: [],
    lessonsList: [],
    lesson: {},
    //  canvas graph
    isWeighted: false,
    isDirected: false,
    categoryUrl: null,
    lessonUrl: null,
    result: null
  },
  getters: {
    getBaseURL: state => state.baseURL,
    navigationList: state => state.navigationList,
    getLessonsList: state => state.lessonsList,
    lesson: state => state.lesson,
    isWeighted: state => state.isWeighted,
    isDirected: state => state.isDirected,
    categoryUrl: state => state.categoryUrl,
    lessonUrl: state => state.lessonUrl,
    result: state => state.result
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
    saveCategoryUrl(state, category) {
      state.categoryUrl = category;
    },
    saveLessonUrl(state, lesson) {
      state.lessonUrl = lesson;
    },
    saveResult: (state, result) => (state.result = result)
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
    loadSolution: async ({ commit, rootState }) => {
      const vertexes = rootState.vertex.vertexes.map(v => ({
        id: v.id,
        edges: v.edges
      }));
      const category = rootState.categoryUrl;
      const lesson = rootState.lessonUrl;
      const response = await fetch(
        `${rootState.baseURL}/categories/${category}/${lesson}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          },
          body: JSON.stringify({ vertexes, category, lesson })
        }
      );
      const res = await response.json();
      commit("saveResult", res.result);
    },
    deleteAll: ({ commit }) => {
      commit("edge/removeAllEdges", null, { root: true });
      commit("vertex/removeAllVertexes", null, { root: true });
    }
  },
  modules: { edge, vertex }
});
