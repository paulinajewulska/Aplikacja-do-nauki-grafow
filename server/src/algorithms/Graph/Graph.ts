import { Vertex } from './Vertex';
import { Edge } from './Edge';

class Graph {
    private _adjList: Vertex[];
    private readonly isDirected: boolean;
    private _visited: Array<Vertex['id'] | boolean> = [];
    public stack: any;

    get vertexes(): Vertex[] {
        return this._adjList;
    }

    set vertexes(v: Vertex[]) {
        this._adjList = v;
    }

    set visited(v: Array<Vertex['id'] | boolean>) {
        this._visited = v;
    }

    get visited(): Array<Vertex['id'] | boolean> {
        return this._visited;
    }

    addVisitedValue(v: Vertex['id'] | boolean): void {
        this._visited.push(v);
    }

    constructor(adjList: Vertex[] = [], isDirected = false) {
        this.isDirected = isDirected;

        const vertexes: Array<Vertex> = [];
        for (const v of adjList) {
            const edges: Array<Edge> = [];
            for (const e of v.edges) {
                if (e._vertexTo !== e._vertexFrom) {
                    edges.push(new Edge(e._vertexFrom, e._vertexTo, e._id, e._weight));
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

    isNullGraph(): string {
        return (this.getGraphSize() === 0 ? 'Jest to graf zerowy' : 'Nie jest to graf zerowy');
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

    getDepthFirstSearch(start: Vertex['id']): Array<Vertex['id'] | boolean> {
        this.visited = [];
        this.depthFirstSearch(start);
        return this.visited;
    }

    breadthFirstSearch(start: Vertex['id']): void {
        const Queue: Array<Vertex['id']> = [];
        this.addVisitedValue(start);
        Queue.push(start);

        while (Queue.length) {
            const vertex = this.vertexes.find(v => v.id === Queue[0]);
            Queue.shift();

            for (const e of vertex.edges) {
                if (!this.visited.includes(e.vertexTo)) {
                    Queue.push(e.vertexTo);
                    this.addVisitedValue(e.vertexTo);
                }
            }
        }
    }

    getBreadthFirstSearch(start: Vertex['id']): Array<Vertex['id'] | boolean> {
        this.visited = [];
        this.breadthFirstSearch(start);
        return this.visited;
    }

    getKruskalMinimumSpanningTree() {
        if(this.isDirected) {
            return 'Graf nie może być skierowany :(';
        }

        if(this.vertexes.some(v => v.edges.length === 0)) {
            return 'Każdy węzeł musi być połączony chociaż jedną krawędzią';
        }

        const separableCollections = [];
        const Queue = [];
        const minSpanningTree = [];

        for (const v of this.vertexes) {
            separableCollections.push([v.id]);
            for (const e of v.edges) {
                Queue.push(e);
            }
        }

        Queue.sort((a, b) => a.weight - b.weight);

        for (let i = 1; i < this.getGraphOrder(); ++i) {
            let vertexFromID, vertexToID;
            let edge;
            do {
                edge = Queue.shift();
                const { vertexFrom, vertexTo } = edge;

                for (let j = 0; j < separableCollections.length; ++j) {
                    vertexFromID = separableCollections[j].some(e => e === vertexFrom) ? j : vertexFromID;
                    vertexToID = separableCollections[j].some(e => e === vertexTo) ? j : vertexToID;
                }
            } while (vertexFromID === vertexToID);

            minSpanningTree.push(edge.id);
            separableCollections[vertexFromID] = [
                ...separableCollections[vertexFromID],
                ...separableCollections[vertexToID]
            ];
            separableCollections.splice(vertexToID, 1);
        }

        return minSpanningTree;
    }

    getPrimMinimumSpanningTree() {
        if(this.isDirected) {
            return 'Graf nie może być skierowany :(';
        }

        if(this.vertexes.some(v => v.edges.length === 0)) {
            return 'Każdy węzeł musi być połączony chociaż jedną krawędzią';
        }

        const minSpanningTree = [];
        const Queue = [];
        const vertexNumber = this.getGraphOrder();
        const visited = Array(vertexNumber).fill(false);
        let currentVertexId = 0;
        let currentEdge: Edge;
        let nextVertexId: number;

        visited[currentVertexId] = true;

        for (let i = 1; i < vertexNumber; ++i) {
            currentVertexId = this.vertexes.indexOf(this.vertexes.find(ed => ed.id === currentVertexId));

            for (const e of this.vertexes[currentVertexId].edges) {
                const id = this.vertexes.indexOf(this.vertexes.find(ed => ed.id === e.vertexTo));
                if (visited[id] === false) {
                    Queue.push(e);
                }
            }

            Queue.sort((a, b) => a.weight - b.weight);

            do {
                currentEdge = Queue.shift();
                nextVertexId = this.vertexes.indexOf(this.vertexes.find(e => e.id === currentEdge.vertexTo));
            } while (visited[nextVertexId] === true);
            minSpanningTree.push(currentEdge.id);
            visited[nextVertexId] = true;
            currentVertexId = nextVertexId;
        }

        return minSpanningTree;
    }

    getDijkstraPath() {
        //    TODO: fix
        const startVertex = 0;
        const adjList = this.getAdjacencyList();

        const shortestPathVertexes = [];
        const queue = this.vertexes;
        const vertexNumber = this.getGraphOrder();
        const costs = Array(vertexNumber).fill(Number.MAX_SAFE_INTEGER);
        const predecessors = Array(vertexNumber).fill(-1);
        costs[startVertex] = 0;

        while (queue.length) {
            // FIX: costs only in queue, not all
            const min = costs.indexOf(Math.min(...costs));
            const currentVertex = this.vertexes[min];
            shortestPathVertexes.push(currentVertex.id);
            const queueID = queue.indexOf(currentVertex);
            queue.splice(queueID, 1);

            for (const v of adjList[min]) {
                if (queue.some(ver => ver.id === v)) {
                    const edge = currentVertex.edges.find(e => e.vertexTo === v);
                    if (edge) {
                        if (costs[v] > (costs[min] + parseInt(String(edge.weight)))) {
                            costs[v] = costs[min] + parseInt(String(edge.weight));
                            predecessors[v] = min;
                        }
                    }
                }
            }
        }

        // TODO: add translation
        return costs;
    }

    getVertexArrayIndex(id: number): number {
        const vertex = this.vertexes.find(v => v.id === id);
        return this.vertexes.indexOf(vertex);
    }

    getBellmanFordPath() {
        const vertexNumber = this.getGraphOrder();
        const costs = Array(vertexNumber).fill(Number.MAX_SAFE_INTEGER);
        const predecessors = Array(vertexNumber).fill(-1);
        const adjList = this.getAdjacencyList();
        let test: boolean;

        costs[0] = 0;

        for (let i = 2; i < vertexNumber + 1; ++i) {
            test = true;
            for (let x = 0; x < vertexNumber; ++x) {
                for (const y of adjList[x]) {
                    const yID = this.getVertexArrayIndex(y);
                    const xID = this.getVertexArrayIndex(x);
                    const nextToVertex = this.vertexes.find(ver => ver.id === x);

                    if (nextToVertex) {
                        const edge = nextToVertex.edges.find(ed => ed.vertexTo === y);
                        if (edge) {
                            const edgeWeight = parseInt(String(edge.weight));
                            if (costs[yID] > costs[xID] + edgeWeight) {
                                test = false;
                                costs[yID] = costs[xID] + edgeWeight;
                                predecessors[yID] = xID;
                            }
                        }
                    }
                }
            }
            if (test) {
                return costs;
            }
        }

        for (let x = 0; x < vertexNumber; ++x) {
            for (const y of adjList[x]) {
                const yID = this.getVertexArrayIndex(y);
                const xID = this.getVertexArrayIndex(x);
                const nextToVertex = this.vertexes.find(ver => ver.id === x);

                if (nextToVertex) {
                    const edge = nextToVertex.edges.find(ed => ed.vertexTo === y);
                    if (edge) {
                        const edgeWeight = parseInt(String(edge.weight));

                        if (costs[yID] > costs[xID] + edgeWeight) {
                            return 'Ujemny cykl :<';
                        }
                    }
                }
            }
            return costs;
        }
    }

    findDFSCycle(startVertex, currVertex) {
        const currVertexIndex = this.getIndexOfVertex(currVertex);

        this.visited[currVertexIndex] = true;
        const adjList = this.getAdjacencyList()[currVertexIndex];

        for (const v of adjList) {
            if (v !== this.stack[this.stack.length - 1]) {
                this.stack.push(currVertex);
                if (v === startVertex) {
                    return true;
                }
                if (!this.visited[this.getVertexArrayIndex(v)] && this.findDFSCycle(startVertex, v)) {
                    return true;
                }
                this.stack.pop();
            }
        }
        return false;
    }

    findCycle() {
        const vertexNumber = this.getGraphOrder();
        this.stack = [];
        const cycle = [];

        for (const v of this.vertexes) {
            this.visited = Array(vertexNumber).fill(false);
            this.stack.push(-1);

            console.log(v.id);
            if (!this.findDFSCycle(v.id, v.id)) {
                this.stack.pop();
            } else {
                while (this.stack.length) {
                    const s = this.stack.pop();
                    if (s > -1) {
                        console.log(s);
                    } else {
                        console.log('\n');
                    }
                }
            }
        }
        return cycle;
    }

    findDFSDirectedCycle(startVertex, currVertex) {
        const currVertexIndex = this.getIndexOfVertex(currVertex);
        this.visited[currVertexIndex] = true;
        this.stack.push(currVertex);

        const adjList = this.getAdjacencyList()[currVertexIndex];

        for (const v of adjList) {
            if (v === startVertex) {
                return true;
            }
            if (!this.visited[this.getVertexArrayIndex(v)] && this.findDFSCycle(startVertex, v)) {
                return true;
            }
            this.stack.pop();
        }
        return false;
    }

    findDirectedCycle() {
        const vertexNumber = this.getGraphOrder();
        this.stack = [];
        const cycle = [];

        for (const v of this.vertexes) {
            this.visited = Array(vertexNumber).fill(false);
            console.log('\n');
            if (this.findDFSDirectedCycle(v.id, v.id)) {
                console.log(v.id);
                while (this.stack.length) {
                    const s = this.stack.pop();
                    console.log(s);
                }
            }
        }
        return cycle;
    }
}

export { Graph };
