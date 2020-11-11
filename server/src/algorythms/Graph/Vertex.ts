import { Edge } from './Edge';

class Vertex {
    private _edges: Edge[];
    private readonly _id: number;

    get edges(): Edge[] {
        return this._edges;
    }

    set edges(edges: Edge[]) {
        this._edges = edges;
    }

    get id(): number {
        return this._id;
    }

    addEdge(edge: Edge): void {
        if (!edge) {
            throw `Edge not provided.`;
        }
        if (this._edges.some(e => e._vertexTo === edge.vertexTo)) {
            throw `Edge ${edge} already exist.`;
        }
        if (edge.vertexTo == this._id) {
            throw `Cannot add edge to the same vertex`;
        }

        this._edges.push(edge);
    }

    removeEdge(edge: number = null): void {
        if (!edge) {
            throw `Edge not provided.`;
        }
        if (!this._edges.some(e => e._vertexTo === edge)) {
            throw `Edge ${edge} doesn't exist.`;
        }
        this._edges = this._edges.filter(e => e._vertexTo !== edge);
    }

    constructor(id: number = null, edges: Edge[] = []) {
        this._id = id;
        this._edges = edges;
    }
}

export { Vertex };
