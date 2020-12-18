import { Vertex } from './Vertex';
import { Edge } from './Edge';

class Graph {
    private _adjList: Vertex[];
    private readonly isDirected: boolean;
    private _visited: Array<Vertex['id']> = [];

    get vertexes(): Vertex[] {
        return this._adjList;
    }

    set vertexes(v: Vertex[]) {
        this._adjList = v;
    }

    set visited(v: Array<Vertex['id']>) {
        this._visited = v;
    }

    get visited(): Array<Vertex['id']> {
        return this._visited;
    }

    addVisitedValue(v: Vertex['id']): void {
        this._visited.push(v);
    }

    constructor(adjList: Vertex[] = [], isDirected = false) {
        this.isDirected = isDirected;

        const vertexes: Array<Vertex> = [];
        for (const v of adjList) {
            const edges: Array<Edge> = [];
            for (const e of v.edges) {
                if (e._vertexTo !== e._vertexFrom) {
                    edges.push(new Edge(e._vertexFrom, e._vertexTo, e._id));
                }
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
        const idList = [];
        for (const v of this.vertexes) {
            for (const e of v.edges) {
                idList.push(e.id);
            }
        }
        return [...new Set(idList)].length;
    }

    isNullGraph(): boolean {
        return this.getGraphSize() === 0;
    }

    getDegree(index: Vertex['id']): number {
        const vertexFromEdges = this.vertexes.find(v => v.id === index).edges.length || 0;
        let vertexToEdges = 0;

        if (this.isDirected) {
            for (const v of this.vertexes) {
                for (const e of v.edges) {
                    if (e.vertexTo === index) {
                        vertexToEdges++;
                    }
                }
            }
        }

        return vertexFromEdges + vertexToEdges;
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
                const edgeIndex = this.getIndexOfVertex(edge.id);
                const vertexToIndex = this.getIndexOfVertex(edge._vertexTo);
                const vertexFromIndex = this.getIndexOfVertex(edge._vertexFrom);
                incMatrix[vertexToIndex][edgeIndex] = 1;
                if (this.isDirected) {
                    incMatrix[vertexFromIndex][edgeIndex] = -1;
                }
            }
        }

        return incMatrix;
    }

    getAdjacencyList(): Array<Array<number>> {
        const adjList = [];

        for (const vertex of this.vertexes) {
            const vertexIndex = this.getIndexOfVertex(vertex.id);
            adjList[vertexIndex] = [];
            for (const edge of vertex.edges) {
                adjList[vertexIndex].push(edge._vertexTo);
            }
        }

        return adjList;
    }

    depthFirstSearch(start: Vertex['id']): void {
        this.addVisitedValue(start);
        const vertex: Vertex = this.vertexes.find(v => v.id === start);

        for (const e of vertex.edges) {
            if (!this.visited.includes(e.vertexTo)) {
                this.depthFirstSearch(e.vertexTo);
            }
        }
    }

    getDepthFirstSearch(start: Vertex['id']): Array<Vertex['id']> {
        this.visited = [];
        this.depthFirstSearch(start);
        return this.visited;
    }

    breadthFirstSearch(start: Vertex['id']): void {
        const Q: Array<Vertex['id']> = [];
        this.addVisitedValue(start);
        Q.push(start);

        while (Q.length) {
            const vertex = this.vertexes.find(v => v.id === Q[0]);
            Q.shift();

            for (const e of vertex.edges) {
                if (!this.visited.includes(e.vertexTo)) {
                    Q.push(e.vertexTo);
                    this.addVisitedValue(e.vertexTo);
                }
            }
        }
    }

    getBreadthFirstSearch(start: Vertex['id']): Array<Vertex['id']> {
        this.visited = [];
        this.breadthFirstSearch(start);
        return this.visited;
    }
}

export { Graph };
