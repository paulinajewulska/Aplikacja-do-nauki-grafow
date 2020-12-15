class Edge {
    readonly _vertexTo: number;
    readonly _vertexFrom: number;
    readonly _id: number;

    get vertexTo() {
        return this._vertexTo;
    }

    get vertexFrom() {
        return this._vertexFrom;
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

export { Edge };
