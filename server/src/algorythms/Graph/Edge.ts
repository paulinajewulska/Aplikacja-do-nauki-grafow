class Edge {
    readonly _vertexTo: number;
    readonly _vertexFrom: number;
    readonly _id: number;

    get vertexTo(): number {
        return this._vertexTo;
    }

    get vertexFrom(): number {
        return this._vertexFrom;
    }

    get id(): number {
        return this._id;
    }

    constructor(vertexFrom = null, vertexTo = null, id = null) {
        this._vertexFrom = vertexFrom;
        this._vertexTo = vertexTo;
        this._id = id;
    }
}

export { Edge };
