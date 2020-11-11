class Edge {
    // TODO: check if vertex exists
    readonly _vertexTo: number = null;

    get vertexTo(): number {
        return this._vertexTo;
    }

    constructor(vertexTo: number) {
        this._vertexTo = vertexTo;
    }
}

export { Edge };
