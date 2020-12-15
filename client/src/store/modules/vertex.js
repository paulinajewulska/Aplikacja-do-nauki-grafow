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

  constructor(vertexFrom = null, vertexTo = null, id = null) {
    this._vertexFrom = vertexFrom;
    this._vertexTo = vertexTo;
    this._id = id;
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
    console.log(edge.id);
    this._edges.push(edge);
  }

  removeEdge(id) {
    if (!this._edges.some(e => e.id === id)) {
      throw `Edge with ${id} id doesn't exist.`;
    }

    this._edges = this._edges.filter(e => e.id !== id);
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
  removeVertexOption: state => state.removeVertexOption,
  availableEdgeId: vertex => {
    if (vertex.edges.length) {
      return (
        vertex.edges.reduce(
          (max, v) => (v.id > max ? v.id : max),
          vertex.edges[0].id
        ) + 1
      );
    } else return 0;
  }
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
  // TODO: refactor it
  addEdge(state, payload) {
    if (!state.vertexes.some(v => v.id === payload.vertexToID)) {
      throw `Vertex with ${payload.vertexToID} does not exists.`;
    }
    if (!state.vertexes.some(v => v.id === payload.vertexFromID)) {
      throw `Vertex with ${payload.vertexFromID} does not exists.`;
    }

    const vertexFrom = state.vertexes.find(v => v.id === payload.vertexFromID);
    vertexFrom.addGraphEdge(
      new Edge(payload.vertexFromID, payload.vertexToID, payload.id)
    );

    if (!this.state.isDirected) {
      const vertexTo = state.vertexes.find(v => v.id === payload.vertexToID);
      vertexTo.addGraphEdge(
        new Edge(payload.vertexToID, payload.vertexFromID, payload.id)
      );
    }
  },
  removeEdge(state, payload) {
    if (!state.vertexes.some(v => v.id !== payload.vertexToID)) {
      throw `Vertex with ${payload.vertexToID} does not exists.`;
    }
    if (!state.vertexes.some(v => v.id !== payload.vertexFromID)) {
      throw `Vertex with ${payload.vertexFromID} does not exists.`;
    }

    const vertexFrom = state.vertexes.find(v => v.id === payload.vertexFromID);
    vertexFrom.removeEdge(payload.id);

    if (!this.state.isDirected) {
      const vertexTo = state.vertexes.find(v => v.id === payload.vertexToID);
      vertexTo.removeEdge(payload.id);
    }
  },
  removeAllVertexes: state => (state.vertexes = [])
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
    commit("edge/removeEdgeConnectedToVertex", payload, { root: true });
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
