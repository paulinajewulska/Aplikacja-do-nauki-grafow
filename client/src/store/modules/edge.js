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
    end = null
  ) {
    this._vertexFrom = vertexFrom;
    this._vertexTo = vertexTo;
    this._id = id;
    this._points = {
      _start: { _x: start.x, _y: start.y },
      _end: { _x: end.x, _y: end.y }
    };
  }
}

const state = () => ({
  addEdgeOption: false,
  removeEdgeOption: false,
  edges: []
});

const getters = {
  addEdgeOption: state => state.addEdgeOption,
  removeEdgeOption: state => state.removeEdgeOption,
  edges: state => state.edges,
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
  addEdge(state, e) {
    const edge = new Edge(
      e.start.vertex,
      e.end.vertex,
      e.id,
      { x: e.start.x, y: e.start.y },
      {
        x: e.end.x,
        y: e.end.y
      }
    );
    state.edges.push(edge);
  },
  removeEdge(state, id) {
    state.edges.splice(
      state.edges.findIndex(e => e.id === id),
      1
    );
  }
};

const actions = {
  addEdge: ({ commit, state }, payload) => {
    if (state.edges.some(v => v.id === payload.id)) {
      throw `Edge with ${payload.id} id already exists.`;
    }
    // TODO: add checking if vertex exists
    commit("addEdge", payload);
  },
  removeEdge: ({ commit, state }, payload) => {
    if (!state.edges.some(v => v.id === payload.id)) {
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
