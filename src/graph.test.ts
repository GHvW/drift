import { Record, Map, Set } from "immutable";
import { Edge, breadthFirstPaths, depthFirstPaths, pathTo } from "./graph";

describe("graph tests", () => {
    const Edge = Record<Edge<number>>({ from: 0, to: 0 });

    const adjacency = Map([
        [1, Set([
            Edge({ from: 1, to: 3}), 
            Edge({ from: 1, to: 4})
        ])],
        [2, Set()],
        [3, Set([
            Edge({ from: 3, to: 1 }),            
            Edge({ from: 3, to: 5 }), 
            Edge({ from: 3, to: 7 }), 
        ])],
        [4, Set([
            Edge({ from: 4, to: 1 }),            
            Edge({ from: 4, to: 8 }), 
        ])],
        [5, Set([
            Edge({ from: 5, to: 3 }),            
            Edge({ from: 5, to: 8 }), 
            Edge({ from: 5, to: 6 }), 
        ])],
        [6, Set([
            Edge({ from: 6, to: 5 }),            
        ])],
        [7, Set([
            Edge({ from: 7, to: 3 }),            
        ])],
        [8, Set([
            Edge({ from: 8, to: 5 }),            
            Edge({ from: 8, to: 4 }), 
        ])],
    ]);

    test("2 + 2 is 4", () => {
        expect(2 + 2).toBe(4);
    }) 

    describe("depth first", () => {

        test("paths", () => {
            const paths = depthFirstPaths(1, adjacency);
            console.log(paths.toJSON());
            expect(paths.size).toEqual(6);
        });

        test("path to specific vertex", () => {
            const result = [...pathTo(depthFirstPaths(1, adjacency), 5)];
            expect(result).toEqual([5, 8, 4, 1]);
        });

    });

    describe("breadth first", () => {

        test("paths", () => {
            const paths = breadthFirstPaths(1, adjacency);
            console.log(paths.toJSON());
            expect(paths.size).toEqual(6);
        });

        test("path to specific vertex", () => {
            const result = [...pathTo(breadthFirstPaths(1, adjacency), 5)];
            expect(result).toEqual([5, 3, 1]);
        });
    });
});