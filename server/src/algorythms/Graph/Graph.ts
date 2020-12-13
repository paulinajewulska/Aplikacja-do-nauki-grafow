import { Vertex } from './Vertex';
import { Edge } from './Edge';

class Graph {
    private _adjList: Vertex[];

    get vertexes(): Vertex[] {
        return this._adjList;
    }

    set vertexes(v: Vertex[]) {
        this._adjList = v;
    }

    constructor(adjList: Vertex[] = []) {
        const vertexes: Array<Vertex> = [];
        for (const v of adjList) {
            const edges: Array<Edge> = [];
            for (const e of v.edges) {
                edges.push(new Edge(e._vertexTo, e._id));
            }
            vertexes.push(new Vertex(v.id, edges));
        }
        this._adjList = vertexes;
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

    getIndexOfVertex(id: number): number {
        return this.vertexes.findIndex(v => v.id === id);
    }

    getAdjacencyMatrix(): Array<Array<number>> {
        const vertexSize = this.getGraphOrder();
        const adjMatrix = Array(vertexSize)
            .fill(null)
            .map(() => Array(vertexSize).fill(0));

        for (const vertex of this.vertexes) {
            for (const edge of vertex.edges) {
                const vertexIndex = this.getIndexOfVertex(vertex.id);
                const vertexToIndex = this.getIndexOfVertex(edge._vertexTo);
                adjMatrix[vertexIndex][vertexToIndex] = 1;
            }
        }

        return adjMatrix;
    }

    getIncidenceMatrix(): Array<Array<number>> {
        const vertexSize = this.getGraphOrder();
        const edgesSize = this.getGraphSize();
        const incMatrix = Array(vertexSize)
            .fill(null)
            .map(() => Array(edgesSize).fill(0));

        for (const vertex of this.vertexes) {
            for (const edge of vertex.edges) {
                const vertexIndex = this.getIndexOfVertex(vertex.id);
                const vertexToIndex = this.getIndexOfVertex(edge.id);
                incMatrix[vertexIndex][vertexToIndex] = 1;
            }
        }

        return incMatrix;
    }

    getAdjacencyList(): Array<Array<number>> {
        const vertexSize = this.getGraphOrder();
        const adjList = [];

        for (const vertex of this.vertexes) {
            const vertexIndex = this.getIndexOfVertex(vertex.id);
            adjList[vertexIndex] = [];
            for (const edge of vertex.edges) {
                adjList[vertexIndex].push(edge.id);
            }
        }

        return adjList;
    }
}

export { Graph };
