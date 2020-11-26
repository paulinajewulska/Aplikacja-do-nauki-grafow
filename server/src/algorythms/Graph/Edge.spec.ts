import {Edge} from "./Edge";

describe('Edge', () => {
    let obj;
    beforeEach(() => {
        obj = new Edge(11);
    });

    test('should create vertex', () => {
        expect(obj).toBeTruthy();
    });

    test('should return correct vertexTo', () => {
        expect(obj.vertexTo).toEqual(11);
    });
});