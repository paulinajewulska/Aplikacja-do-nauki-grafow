class Edge {
  get vertexFrom() {
    return this._vertexFrom;
  }

  get vertexTo() {
    return this._vertexTo;
  }

  get id() {
    return this._id;
  }

  get weight() {
    return this._weight;
  }

  set weight(newWeight) {
    this._weight = newWeight;
  }

  get points() {
    const start = { x: this._points._start._x, y: this._points._start._y };
    const end = { x: this._points._end._x, y: this._points._end._y };
    return { start, end };
  }

  constructor(
    vertexFrom = null,
    vertexTo = null,
    id = null,
    start = null,
    end = null,
    weight = 1
  ) {
    this._vertexFrom = vertexFrom;
    this._vertexTo = vertexTo;
    this._id = id;
    this._points = {
      _start: { _x: start.x, _y: start.y },
      _end: { _x: end.x, _y: end.y }
    };
    this._weight = weight;
  }
}

const state = () => ({
  addEdgeOption: false,
  removeEdgeOption: false,
  addWeightToEdgeOption: false,
  edges: [],
  selectedEdge: null
});

const getters = {
  addEdgeOption: state => state.addEdgeOption,
  removeEdgeOption: state => state.removeEdgeOption,
  edges: state => state.edges,
  addWeightToEdgeOption: state => state.addWeightToEdgeOption,
  selectedEdge: state => state.selectedEdge,
  availableEdgeId: state => {
    if (state.edges.length) {
      return (
        state.edges.reduce(
          (max, v) => (v.id > max ? v.id : max),
          state.edges[0].id
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
  toggleRemoveEdgeOption(state) {
    if (state.addEdgeOption) {
      state.addEdgeOption = false;
    }
    state.removeEdgeOption = !state.removeEdgeOption;
  },
  addEdge(state, edge) {
    state.edges.push(edge);
  },
  removeEdge(state, id) {
    state.edges.splice(
      state.edges.findIndex(e => e.id === id),
      1
    );
  },
  removeEdgeConnectedToVertex(state, removedVertex) {
    state.edges = state.edges.filter(
      v => v.vertexFrom !== removedVertex && v.vertexTo !== removedVertex
    );
  },
  removeAllEdges: state => (state.edges = []),
  toggleAddWeightToEdgeOption: state =>
    (state.addWeightToEdgeOption = !state.addWeightToEdgeOption),
  setWeight(state, weight) {
    const edge = state.edges.find(e => e.id === state.selectedEdge);
    if (edge) {
      edge.weight = weight;
    }
  },
  selectedEdge: (state, id) => (state.selectedEdge = id)
};

const actions = {
  addEdge: ({ commit, state }, payload) => {
    if (!payload.start || !payload.end) {
      throw `Vertex does not exist.`;
    }
    if (state.edges.some(v => v.id === payload.id)) {
      throw `Edge with ${payload.id} id already exists.`;
    }

    // TODO: add checking if vertex exists
    const edge = new Edge(
      payload.start.vertex,
      payload.end.vertex,
      payload.id,
      { x: payload.start.x, y: payload.start.y },
      {
        x: payload.end.x,
        y: payload.end.y
      }
    );
    commit("addEdge", edge);
    commit(
      "vertex/addEdge",
      {
        id: payload.id,
        vertexToID: payload.end.vertex,
        vertexFromID: payload.start.vertex
      },
      { root: true }
    );
  },
  removeEdge: ({ commit, state }, payload) => {
    if (!state.edges.some(v => v.id === payload.id)) {
      throw `Edge with ${payload.id} id does not exist.`;
    }
    const edge = state.edges.find(e => e.id === payload.id);
    commit("removeEdge", edge.id);
    commit(
      "vertex/removeEdge",
      {
        vertexFromID: edge.vertexFrom,
        vertexToID: edge.vertexTo,
        id: edge.id
      },
      { root: true }
    );
  },
  setWeight: ({ commit }, weight) => {
    commit("setWeight", weight);
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
