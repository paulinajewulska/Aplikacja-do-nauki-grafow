class Edge {
    // TODO: check if vertex exists
    readonly _vertexTo: number = null;
    private readonly _id: number;

    get vertexTo(): number {
        return this._vertexTo;
    }

    get id(): number {
        return this._id;
    }

    constructor(id: number, vertexTo: number) {
        this._id = id;
        this._vertexTo = vertexTo;
    }
}

export {Edge};
