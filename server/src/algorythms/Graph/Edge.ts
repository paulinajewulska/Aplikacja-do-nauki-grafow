class Edge {
    readonly _vertexTo: number;
    readonly _id: number;

    get vertexTo() {
        return this._vertexTo;
    }

    get id() {
        return this._id;
    }

    constructor(vertexTo = null, id = null) {
        this._vertexTo = vertexTo;
        this._id = id;
    }
}

export { Edge };
