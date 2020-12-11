const state = () => ({
  addEdgeOption: false,
  removeEdgeOption: false,
  edgeList: []
});

const getters = {
  addEdgeOption: state => {
    return state.addEdgeOption;
  },
  removeEdgeOption: state => state.removeEdgeOption,
  edgeList: state => state.edgeList,
  availableEdgeId: state => {
    if (state.edgeList.length) {
      return (
        state.edgeList.reduce(
          (max, v) => (v.id > max ? v.id : max),
          state.edgeList[0].id
        ) + 1
      );
    } else return 0;
  }
};

const mutations = {
  toggleAddEdgeOption(state) {
    if (state.removeEdgeOption) {
      state.removeEdgeOption = false;
    }
    state.addEdgeOption = !state.addEdgeOption;
  },
  toggleDeleteEdgeOption(state) {
    if (state.addEdgeOption) {
      state.addEdgeOption = false;
    }
    state.removeEdgeOption = !state.removeEdgeOption;
  },
  addEdge(state, edge) {
    state.edgeList.push(edge);
  },
  removeEdge(state, id) {
    state.edgeList.splice(
      state.edgeList.findIndex(e => e.id === id),
      1
    );
  }
};

const actions = {
  addEdge: ({ commit }, payload) => {
    commit("addEdge", payload.edge);
  },
  removeEdge: ({ commit, state }, payload) => {
    if (!state.edgeList.some(v => v.id === payload.id)) {
      throw `Edge with ${payload.id} id does not exist.`;
    }
    commit("removeEdge", payload.id);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
