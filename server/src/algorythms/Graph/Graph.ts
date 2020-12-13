import { Vertex } from './Vertex';

class Graph {
    private _adjList: Vertex[];

    get vertexes(): Vertex[] {
        return this._adjList;
    }

    set vertexes(v: Vertex[]) {
        this._adjList = v;
    }

    constructor(adjList: Vertex[] = []) {
        this._adjList = adjList;
    }

    addVertex(vertex: Vertex = null): void {
        if (!vertex) {
            throw `Vertex not provided.`;
        }
        if (this._adjList.some(v => v.id === vertex.id)) {
            throw `Edge ${vertex} already exists.`;
        }
        this._adjList.push(vertex);
    }

    removeVertex(id: number = null): void {
        if (!id) {
            throw `Vertex id not provided.`;
        }
        if (!this._adjList.some(v => v.id === id)) {
            throw `Vertex with id: ${id} doesn't exist.`;
        }
        // delete vertex
        this._adjList = this._adjList.filter(v => v.id !== id);

        //  delete all edges connected to this vertex
        for (const v of this._adjList) {
            for (const e of v.edges) {
                if (e.vertexTo === id) {
                    try {
                        v.removeEdge(id);
                    } catch (err) {
                        console.log(err);
                    }
                }
            }
        }
    }

    getGraphOrder(): number {
        return this._adjList.length;
    }

    getGraphSize(): number {
        // TODO: fix it, should add by unique id
        return this._adjList.reduce((graphSize, v) => (graphSize += v.edges.length), 0) / 2;
    }

    isNullGraph(): boolean {
        return this.getGraphSize() === 0;
    }

    getDegree(index): number {
        const vertex = this.vertexes.find(v => v.id === index);
        return vertex.edges.length;
    }
}

export { Graph };
