class Edge {
  get vertexTo() {
    return this._vertexTo;
  }

  constructor(vertexTo = null) {
    this._vertexTo = vertexTo;
  }
}

class Vertex {
  get edges() {
    return this._edges;
  }

  get id() {
    return this._id;
  }

  get x() {
    return this._x;
  }

  get y() {
    return this._y;
  }

  addGraphEdge(edge) {
    if (!edge) {
      throw `Edge not provided.`;
    }
    if (this._edges.some(e => e._vertexTo === edge.vertexTo)) {
      throw `Edge ${edge} already exist.`;
    }
    if (edge.vertexTo === this._id) {
      throw `Cannot add edge to the same vertex`;
    }

    this._edges.push(edge);
  }

  removeEdge(edge) {
    if (!edge) {
      throw `Edge not provided.`;
    }
    if (!this._edges.some(e => e._vertexTo === edge)) {
      throw `Edge ${edge} doesn't exist.`;
    }
    this._edges = this._edges.filter(e => e._vertexTo !== edge);
  }

  constructor(x = 0, y = 0, id = null, edges = []) {
    this._x = x;
    this._y = y;
    this._id = id;
    this._edges = edges;
  }
}

const state = () => ({
  vertexes: [],
  addVertexOption: false,
  removeVertexOption: false
});

const getters = {
  vertexes: state => state.vertexes,
  addVertexOption: state => state.addVertexOption,
  availableVertexId: state => {
    if (state.vertexes.length) {
      return (
        state.vertexes.reduce(
          (max, v) => (v.id > max ? v.id : max),
          state.vertexes[0].id
        ) + 1
      );
    } else return 0;
  },
  vertexesNumber: state => state.vertexes.length,
  removeVertexOption: state => state.removeVertexOption
};

const mutations = {
  addVertex(state, v) {
    state.vertexes.push(new Vertex(v.x, v.y, v.id));
  },
  toggleAddVertexOption(state) {
    if (state.removeVertexOption) {
      state.removeVertexOption = false;
    }
    state.addVertexOption = !state.addVertexOption;
  },
  removeVertex(state, id) {
    state.vertexes.splice(
      state.vertexes.findIndex(v => v.id === id),
      1
    );
  },
  toggleRemoveVertexOption(state) {
    if (state.addVertexOption) {
      state.addVertexOption = false;
    }
    state.removeVertexOption = !state.removeVertexOption;
  },
  addEdge(state, payload) {
    if (!state.vertexes.some(v => v.id === payload.vertexToID)) {
      throw `Vertex with ${payload.vertexToID} does not exists.`;
    }
    if (!state.vertexes.some(v => v.id === payload.vertexFromID)) {
      throw `Vertex with ${payload.vertexFromID} does not exists.`;
    }
    const vertexFrom = state.vertexes.find(v => v.id === payload.vertexFromID);
    vertexFrom.addGraphEdge(new Edge(payload.vertexToID));
  }
};

const actions = {
  addVertex: ({ commit, state }, payload) => {
    if (state.vertexes.some(v => v.id === payload.vertex.id)) {
      throw `Vertex with ${payload.vertex.id} id already exists.`;
    }
    commit("addVertex", payload.vertex);
  },
  removeVertex: ({ commit, state }, payload) => {
    if (!state.vertexes.some(v => v.id === payload.id)) {
      throw `Vertex with ${payload.id} id does not exist.`;
    }
    commit("removeVertex", payload.id);
    commit("edge/removeEdgeConnectedToVertex", payload.id, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
