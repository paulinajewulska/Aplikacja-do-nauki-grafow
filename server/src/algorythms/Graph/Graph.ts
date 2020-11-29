import {Vertex} from './Vertex';

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
        return this._adjList.reduce((graphSize, v) => (graphSize += v.edges.length), 0);
    }

    isNullGraph(): boolean {
        return !this.getGraphSize();
    }

    // graph representation
    getAdjacencyMatrix() {
        const adjListSize = this.getGraphOrder();
        const getAdjMatrix = (rows, cols) => new Array(cols).fill(0)
            .map((o, i) => new Array(rows).fill(0));
        const adjMatrix = getAdjMatrix(adjListSize, adjListSize);

        for (const v of this.vertexes) {
            for (const e of v.edges) {
                // right now there is no directed or weighted graphs
                adjMatrix[v.id][e.vertexTo] = 1;
                adjMatrix[e.vertexTo][v.id] = 1;
            }
        }
        return adjMatrix;
    }

    getAdjacencyList() {
        return this.vertexes;
    }

    getIncidenceMatrix() {
        const adjListRows = this.getGraphOrder();
        const adjListCols = this.getGraphSize();
        const getIncidenceMatrix = (rows, cols) => new Array(cols).fill(0)
            .map((o, i) => new Array(rows).fill(0));
        const adjMatrix = getIncidenceMatrix(adjListRows, adjListCols);

        for (const v of this.vertexes) {
            for (const e of v.edges) {
                // right now there is no directed or weighted graphs
                adjMatrix[v.id][e.id] = 1;
            }
        }
        return adjMatrix;
    }


}

export {Graph};
