import { test, describe, expect } from "vitest";
import Immutable from "immutable";
import { breadthFirstPaths, depthFirstPaths, path } from "./adjacencyMap";

describe("adjacency map tests", () => {

    const adjacency = Immutable.Map([
        [1, Immutable.Set([
            Immutable.Map({ from: 1, to: 3 }),
            Immutable.Map({ from: 1, to: 4 })
        ])
        ],
        [2, Immutable.Set()],
        [3, Immutable.Set([
            Immutable.Map({ from: 3, to: 1 }),
            Immutable.Map({ from: 3, to: 5 }),
            Immutable.Map({ from: 3, to: 7 }),
        ])
        ],
        [4, Immutable.Set([
            Immutable.Map({ from: 4, to: 1 }),
            Immutable.Map({ from: 4, to: 8 }),
        ])
        ],
        [5, Immutable.Set([
            Immutable.Map({ from: 5, to: 3 }),
            Immutable.Map({ from: 5, to: 8 }),
            Immutable.Map({ from: 5, to: 6 }),
        ])
        ],
        [6, Immutable.Set([
            Immutable.Map({ from: 6, to: 5 }),
        ])
        ],
        [7, Immutable.Set([
            Immutable.Map({ from: 7, to: 3 }),
        ])
        ],
        [8, Immutable.Set([
            Immutable.Map({ from: 8, to: 5 }),
            Immutable.Map({ from: 8, to: 4 }),
        ])
        ],
    ]);

    test("2 + 2 is 4", () => {
        expect(2 + 2).toBe(4);
    })

    describe("depth first", () => {

        test("paths", () => {
            const paths = depthFirstPaths(1, adjacency);
            // console.log(paths.toJSON());
            expect(paths.size).toEqual(7);
        });

        test("path to specific vertex", () => {
            const result = [...pathTo(depthFirstPaths(1, adjacency), 5)];

            expect(result).toEqual([5, 8, 4, 1]);
        });

    });

    describe("breadth first", () => {

        test("paths", () => {
            const paths = breadthFirstPaths(1, adjacency);
            expect(paths.size).toEqual(7);
        });

        test("path to specific vertex", () => {
            const result = [...pathTo(breadthFirstPaths(1, adjacency), 5)];

            expect(result).toEqual([5, 3, 1]);
        });
    });
});