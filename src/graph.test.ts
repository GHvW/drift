const { Record, Map: ImmutableMap, Set: ImmutableSet } = require("immutable");
const { depthFirstTraverse, breadthFirstTraverse } = require("./graph");

describe("graph tests", () => {
    const Vertex = Record(0);
    const Edge = Record({ from: Vertex(0), to: Vertex(0) });

    const adjacency = ImmutableMap([
        [Vertex(1), ImmutableSet([
            Edge({ from: Vertex(1), to: Vertex(3)}), 
            Edge({ from: Vertex(1), to: Vertex(4)})
        ])],
        [Vertex(2), ImmutableSet()],
        [Vertex(3), ImmutableSet([
            Edge({ from: Vertex(3), to: Vertex(1)}),            
            Edge({ from: Vertex(3), to: Vertex(5)}), 
            Edge({ from: Vertex(3), to: Vertex(7)}), 
        ])],
        [Vertex(4), ImmutableSet([
            Edge({ from: Vertex(4), to: Vertex(1)}),            
            Edge({ from: Vertex(4), to: Vertex(8)}), 
        ])],
        [Vertex(5), ImmutableSet([
            Edge({ from: Vertex(5), to: Vertex(3)}),            
            Edge({ from: Vertex(5), to: Vertex(8)}), 
            Edge({ from: Vertex(5), to: Vertex(6)}), 
        ])],
        [Vertex(6), ImmutableSet([
            Edge({ from: Vertex(6), to: Vertex(5)}),            
        ])],
        [Vertex(7), ImmutableSet([
            Edge({ from: Vertex(7), to: Vertex(3)}),            
        ])],
        [Vertex(8), ImmutableSet([
            Edge({ from: Vertex(8), to: Vertex(5)}),            
            Edge({ from: Vertex(8), to: Vertex(4)}), 
        ])],
    ]);

    test("2 + 2 is 4", () => {
        expect(2 + 2).toBe(4);
    }) 

    describe("depth first tests", () => {

    });

    describe("breadth first tests", () => {

    });
});