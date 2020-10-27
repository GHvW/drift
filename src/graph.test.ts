import { Record, Map, Set } from "immutable";
import { breadthFirstTraverse, Edge } from "./graph";

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

    // describe("depth first tests", () => {

    //     for (let val of depthFirstTraverse(1, adjacency)) {
    //         console.log(val);
    //     }
    // });

    describe("breadth first tests", () => {

        for (let val of breadthFirstTraverse(1, adjacency)) {
            console.log(val);
        }
    });
});