import { test, describe, expect } from "vitest";
import Immutable, { Record } from "immutable";
import { breadthFirstPaths, depthFirstPaths, path, AdjacencyMap } from "./adjacencyMap";
import { Vertex, VertexProps, Edge, EdgeProps } from "./graph";
import { collect, toArray } from "./sequences/collect";

describe("adjacency map tests", () => {
    const IntVertex: Record.Factory<VertexProps<number>> = Record({ value: 0 });
    const IntEdge: Record.Factory<EdgeProps<number>> = Record({ from: IntVertex(), to: IntVertex() });

    const adjacency: AdjacencyMap<number> = Immutable.Map<Vertex<number>, Immutable.Set<Edge<number>>>([
        [
            IntVertex({ value: 1 }),
            Immutable.Set([
                IntEdge({ from: IntVertex({ value: 1 }), to: IntVertex({ value: 3 }) }),
                IntEdge({ from: IntVertex({ value: 1 }), to: IntVertex({ value: 4 }) })
            ])
        ],
        [
            IntVertex({ value: 2 }),
            Immutable.Set<Edge<number>>()],
        [
            IntVertex({ value: 3 }),
            Immutable.Set([
                IntEdge({ from: IntVertex({ value: 3 }), to: IntVertex({ value: 1 }) }),
                IntEdge({ from: IntVertex({ value: 3 }), to: IntVertex({ value: 5 }) }),
                IntEdge({ from: IntVertex({ value: 3 }), to: IntVertex({ value: 7 }) }),
            ])
        ],
        [
            IntVertex({ value: 4 }),
            Immutable.Set([
                IntEdge({ from: IntVertex({ value: 4 }), to: IntVertex({ value: 1 }) }),
                IntEdge({ from: IntVertex({ value: 4 }), to: IntVertex({ value: 8 }) }),
            ])
        ],
        [
            IntVertex({ value: 5 }),
            Immutable.Set([
                IntEdge({ from: IntVertex({ value: 5 }), to: IntVertex({ value: 3 }) }),
                IntEdge({ from: IntVertex({ value: 5 }), to: IntVertex({ value: 8 }) }),
                IntEdge({ from: IntVertex({ value: 5 }), to: IntVertex({ value: 6 }) }),
            ])
        ],
        [
            IntVertex({ value: 6 }),
            Immutable.Set([
                IntEdge({ from: IntVertex({ value: 6 }), to: IntVertex({ value: 5 }) }),
            ])
        ],
        [
            IntVertex({ value: 7 }),
            Immutable.Set([
                IntEdge({ from: IntVertex({ value: 7 }), to: IntVertex({ value: 3 }) }),
            ])
        ],
        [
            IntVertex({ value: 8 }),
            Immutable.Set([
                IntEdge({ from: IntVertex({ value: 8 }), to: IntVertex({ value: 5 }) }),
                IntEdge({ from: IntVertex({ value: 8 }), to: IntVertex({ value: 4 }) }),
            ])
        ],
    ]);

    test("2 + 2 is 4", () => {
        expect(2 + 2).toBe(4);
    })

    describe("depth first", () => {

        const paths = toArray(depthFirstPaths(IntVertex({ value: 1 }), adjacency));

        test("paths", () => {
            expect(paths.length).toEqual(8);

        });

        test("path to specific vertex", () => {
            let gen = depthFirstPaths(IntVertex({ value: 1 }), adjacency);
            gen.next().value;
            gen.next().value;
            gen.next().value;
            let it = gen.next().value;

            if (it) {

                const result = toArray(path(IntVertex({ value: 5 }), it)).map(x => x.value);
                expect(result).toEqual([5, 8, 4, 1]);
            }
        });

    });

    describe("breadth first", () => {

        const paths = toArray(breadthFirstPaths(IntVertex({ value: 1 }), adjacency));

        console.log(paths[paths.length - 1]);
        test("paths", () => {
            expect(paths.length).toEqual(8);
        });

        test("path to specific vertex", () => {
            let gen = breadthFirstPaths(IntVertex({ value: 1 }), adjacency);
            gen.next();
            gen.next();
            let it = gen.next().value;

            if (it) {
                const result = toArray(path(IntVertex({ value: 5 }), it)).map(x => x.value);

                expect(result).toEqual([5, 3, 1]);
            }
        });
    });
});