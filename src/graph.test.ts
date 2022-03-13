import { test, describe, expect } from "vitest";
import Immutable, { Record } from "immutable";
import { AdjacencyMap, EdgeProps, VertexProps, Vertex, breadthFirstPaths, depthFirstPaths, pathTo } from "./graph";

describe("graph tests", () => {
    const Vertex: Record.Factory<VertexProps<number>> = Record({ value: 0 });
    const Edge: Record.Factory<EdgeProps<number>> = Record({ to: Vertex(), from: Vertex() });

    // const vertex: Vertex<number> = vert();
    // const edge: Edge<number> = edge();

    const adjacency: AdjacencyMap<number> = Immutable.Map([
        [Vertex({ value: 1 }), Immutable.Set([
            Edge({ from: Vertex({ value: 1 }), to: Vertex({ value: 3 }) }),
            Edge({ from: Vertex({ value: 1 }), to: Vertex({ value: 4 }) })
        ])],
        [Vertex({ value: 2 }), Immutable.Set()],
        [Vertex({ value: 3 }), Immutable.Set([
            Edge({ from: Vertex({ value: 3 }), to: Vertex({ value: 1 }) }),
            Edge({ from: Vertex({ value: 3 }), to: Vertex({ value: 5 }) }),
            Edge({ from: Vertex({ value: 3 }), to: Vertex({ value: 7 }) }),
        ])],
        [Vertex({ value: 4 }), Immutable.Set([
            Edge({ from: Vertex({ value: 4 }), to: Vertex({ value: 1 }) }),
            Edge({ from: Vertex({ value: 4 }), to: Vertex({ value: 8 }) }),
        ])],
        [Vertex({ value: 5 }), Immutable.Set([
            Edge({ from: Vertex({ value: 5 }), to: Vertex({ value: 3 }) }),
            Edge({ from: Vertex({ value: 5 }), to: Vertex({ value: 8 }) }),
            Edge({ from: Vertex({ value: 5 }), to: Vertex({ value: 6 }) }),
        ])],
        [Vertex({ value: 6 }), Immutable.Set([
            Edge({ from: Vertex({ value: 6 }), to: Vertex({ value: 5 }) }),
        ])],
        [Vertex({ value: 7 }), Immutable.Set([
            Edge({ from: Vertex({ value: 7 }), to: Vertex({ value: 3 }) }),
        ])],
        [Vertex({ value: 8 }), Immutable.Set([
            Edge({ from: Vertex({ value: 8 }), to: Vertex({ value: 5 }) }),
            Edge({ from: Vertex({ value: 8 }), to: Vertex({ value: 4 }) }),
        ])],
    ]);

    test("2 + 2 is 4", () => {
        expect(2 + 2).toBe(4);
    })

    describe("depth first", () => {

        test("paths", () => {
            const paths = depthFirstPaths(Edge, Vertex({ value: 1 }), adjacency);
            // console.log(paths.toJSON());
            expect(paths.size).toEqual(7);
        });

        test("path to specific vertex", () => {
            const result =
                [...pathTo(depthFirstPaths(Edge, Vertex({ value: 1 }), adjacency), Vertex({ value: 5 }))].map(it => it.value);

            expect(result).toEqual([5, 8, 4, 1]);
        });

    });

    describe("breadth first", () => {

        test("paths", () => {
            const paths = breadthFirstPaths(Edge, Vertex({ value: 1 }), adjacency);
            expect(paths.size).toEqual(7);
        });

        test("path to specific vertex", () => {
            const result: Array<number> =
                [...pathTo(breadthFirstPaths(Edge, Vertex({ value: 1 }), adjacency), Vertex({ value: 5 }))].map(x => x.value);
            expect(result).toEqual([5, 3, 1]);
        });
    });
});