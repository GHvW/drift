import { Record, Map, Set } from "immutable";
import { depthFirstTraverse, breadthFirstTraverse } from "./graph";

describe("graph tests", () => {
    const Vertex = Record(0);
    const Edge = Record({ from: Vertex(0), to: Vertex(0) });

    const adjacency = Map([
        [Vertex(1), Set([
            Edge({ from: Vertex(1), to: Vertex(3)}), 
            Edge({ from: Vertex(1), to: Vertex(4)})
        ])],
        [Vertex(2), Set()],
        [Vertex(3), Set([
            Edge({ from: Vertex(3), to: Vertex(1)}),            
            Edge({ from: Vertex(3), to: Vertex(5)}), 
            Edge({ from: Vertex(3), to: Vertex(7)}), 
        ])],
        [Vertex(4), Set([
            Edge({ from: Vertex(4), to: Vertex(1)}),            
            Edge({ from: Vertex(4), to: Vertex(8)}), 
        ])],
        [Vertex(5), Set([
            Edge({ from: Vertex(5), to: Vertex(3)}),            
            Edge({ from: Vertex(5), to: Vertex(8)}), 
            Edge({ from: Vertex(5), to: Vertex(6)}), 
        ])],
        [Vertex(6), Set([
            Edge({ from: Vertex(6), to: Vertex(5)}),            
        ])],
        [Vertex(7), Set([
            Edge({ from: Vertex(7), to: Vertex(3)}),            
        ])],
        [Vertex(8), Set([
            Edge({ from: Vertex(8), to: Vertex(5)}),            
            Edge({ from: Vertex(8), to: Vertex(4)}), 
        ])],
    ]);

    test("2 + 2 is 4", () => {
        expect(2 + 2).toBe(4);
    }) 

    describe("depth first tests", () => {
        const order = [1, 2, 3, 4, 5, 6];
        for (let val of depthFirstTraverse(Vertex(1), adjacency)) {
            expect(val.get
        }
    });

    describe("breadth first tests", () => {

    });
});