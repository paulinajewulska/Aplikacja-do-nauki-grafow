import {Edge} from "./Edge";
import {Vertex} from "./Vertex";

describe('Vertex', () => {
    let vertex;
    let edge1, edge2;

    beforeEach(() => {
        edge1 = new Edge(1);
        edge2 = new Edge(2);
    });

    describe('Vertex with given id', () => {
        beforeEach(() => {
            vertex = new Vertex(5, [edge1, edge2]);
        });

        test('should create vertex', () => {
            expect(vertex).toBeTruthy();
        });

        test('should get correct id', () => {
            expect(vertex.id).toBe(5);
        });

        test('should get correct edges', () => {
            expect(vertex.edges[1]).toBe(edge2);
            expect(vertex.edges.length).toBe(2);
        });

        test('should set correct edges', () => {
            vertex.edges = [edge1, edge2];
            expect(vertex.edges[0]).toBe(edge1);
            expect(vertex.edges.length).toBe(2);
        });

        test('should throw exception if edge does not exist during adding edge', () => {
            expect(() => vertex.addEdge()).toThrowError('Edge not provided.');
        });

        test('should NOT add edge if already exists', () => {
            const newEdge = new Edge(2);
            expect(() => vertex.addEdge(newEdge)).toThrowError(`Edge ${newEdge} already exist.`);
        });

        test('should NOT add edge to the same vertex', () => {
            const newEdge = new Edge(5);
            expect(() => vertex.addEdge(newEdge)).toThrowError(`Cannot add edge to the same vertex.`);
        });

        test('should add edge', () => {
            const newEdge = new Edge(3);
            vertex.addEdge(newEdge);
            expect(vertex.edges.length).toEqual(3);
            expect(vertex.edges).toContain(newEdge);
        });

        test('should throw exception if edge does not exist during removing edge', () => {
            expect(() => vertex.removeEdge()).toThrowError('Edge not provided.');
        });

        test('should throw exception to remove edge if does not exist', () => {
            expect(() => vertex.removeEdge(3)).toThrow();
        });

        test('should remove edge', () => {
            vertex.removeEdge(2);
            expect(vertex.edges.length).toEqual(1);
            expect(vertex.edges).not.toContain(edge2);
        });
    });
});