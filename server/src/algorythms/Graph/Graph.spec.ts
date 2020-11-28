import {Edge} from "./Edge";
import {Vertex} from "./Vertex";
import {Graph} from "./Graph";

describe('Graph', () => {
    let vertex1, vertex2;
    let edge1, edge2, edge3, edge4;
    let graph;

    beforeEach(() => {
        edge1 = new Edge(1);
        edge2 = new Edge(2);
        edge3 = new Edge(3);
        edge4 = new Edge(4);
        vertex1 = new Vertex(1, [edge1, edge2]);
        vertex2 = new Vertex(2, [edge1, edge2]);

        graph = new Graph([vertex1, vertex2]);
    });

    test('should create graph', () => {
        expect(graph).toBeTruthy();
    });

    test('should get list of vertexes', () => {
        expect(graph.vertexes.length).toEqual(2);
    });

    test('should return correct vertexTo', () => {
        const vertex = new Vertex(3, []);
        graph.vertexes = [vertex, vertex1, vertex2];
        expect(graph.vertexes.length).toEqual(3);
    });

    test('should return correct graph order', () => {
        expect(graph.getGraphOrder()).toEqual(2);
    });

    test('should return correct graph size', () => {
        expect(graph.getGraphSize()).toEqual(4);
    });

    test('should return if graph is null graph', () => {
        expect(graph.isNullGraph()).toBeFalsy();
    });

    describe('addVertex', () => {

        test('should throw exception if vertex does not exist during adding vertex', () => {
            expect(() => graph.addVertex()).toThrow();
        });

        test('should NOT add vertex if already exists', () => {
            const vertex = new Vertex(2);
            expect(() => graph.addVertex(vertex)).toThrow();
        });

        test('should add vertex', () => {
            const vertex = new Vertex(3, []);
            graph.addVertex(vertex);
            expect(graph.vertexes.length).toEqual(3);
        });
    });

    describe('removeVertex', () => {

        test('should throw exception if vertex with id does not exist during removing vertex', () => {
            expect(() => graph.removeVertex()).toThrow();
        });

        test('should throw exception if vertex does not exist', () => {
            expect(() => graph.removeVertex(3)).toThrow();
        });

        test('should remove vertex', () => {
            graph.removeVertex(2);
            expect(graph.vertexes.length).toEqual(1);
        });
    });
});
