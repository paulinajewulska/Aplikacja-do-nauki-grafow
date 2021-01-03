class Edge {
    readonly _vertexTo: number;
    readonly _vertexFrom: number;
    readonly _id: number;
    readonly _weight: number;

    get vertexTo(): number {
        return this._vertexTo;
    }

    get vertexFrom(): number {
        return this._vertexFrom;
    }

    get id(): number {
        return this._id;
    }

    get weight(): number {
        return this._weight;
    }

    constructor(vertexFrom = null, vertexTo = null, id = null, weight = null) {
        this._vertexFrom = vertexFrom;
        this._vertexTo = vertexTo;
        this._id = id;
        this._weight = weight;
    }
}

export { Edge };
