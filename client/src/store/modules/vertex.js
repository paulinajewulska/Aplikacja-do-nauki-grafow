import { Edge } from "./edge";

class Vertex {
  get edges() {
    return this._edges;
  }

  set edges(edges) {
    this._edges = edges;
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
    if (!edge) return;
    this._edges.push(
      new Edge(
        edge._vertexFrom,
        edge._vertexTo,
        edge._id,
        edge._points._start,
        edge._points._end,
        edge._weight
      )
    );
  }

  removeEdge(id) {
    if (!this._edges.some(e => e.id === id)) return;
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
  setAddVertexOption(state, value) {
    state.addVertexOption = value;
  },
  removeVertex(state, id) {
    state.vertexes.splice(
      state.vertexes.findIndex(v => v.id === id),
      1
    );
    for (const v of state.vertexes) {
      v.edges = v.edges.filter(e => e.vertexTo !== id);
    }
  },
  setRemoveVertexOption(state, value) {
    state.removeVertexOption = value;
  },
  addEdge(state, payload) {
    if (!state.vertexes.some(v => v.id === payload._vertexTo)) return;
    if (!state.vertexes.some(v => v.id === payload._vertexFrom)) return;
    if (payload._vertexTo === payload._vertexFrom) return;

    const vertexFrom = state.vertexes.find(v => v.id === payload._vertexFrom);
    vertexFrom.addGraphEdge(payload);

    if (!this.state.isDirected) {
      const vertexTo = state.vertexes.find(v => v.id === payload._vertexTo);
      vertexTo.addGraphEdge(payload);
    }
  },
  removeEdge(state, payload) {
    if (!state.vertexes.some(v => v.id !== payload.vertexToID)) return;
    if (!state.vertexes.some(v => v.id !== payload.vertexFromID)) return;

    const vertexFrom = state.vertexes.find(v => v.id === payload.vertexFromID);
    vertexFrom.removeEdge(payload.id);

    if (!this.state.isDirected) {
      const vertexTo = state.vertexes.find(v => v.id === payload.vertexToID);
      vertexTo.removeEdge(payload.id);
    }
  },
  // updateEdge(state, payload) {
  //   if (!state.vertexes.some(v => v.id !== payload.vertexToID)) {
  //     throw `Vertex with ${payload.vertexToID} does not exists.`;
  //   }
  //   if (!state.vertexes.some(v => v.id !== payload.vertexFromID)) {
  //     throw `Vertex with ${payload.vertexFromID} does not exists.`;
  //   }
  //
  //   const vertexFrom = state.vertexes.find(v => v.id === payload.vertexFromID);
  //   const edgeFrom = vertexFrom.edges.find(e => e.id === payload.id);
  //   edgeFrom.weight = payload.weight;
  //
  //   if (!this.state.isDirected) {
  //     const vertexTo = state.vertexes.find(v => v.id === payload.vertexToID);
  //     const edgeTo = vertexTo.edges.find(e => e.id === payload.id);
  //     edgeTo.weight = payload.weight;
  //   }
  // },
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
