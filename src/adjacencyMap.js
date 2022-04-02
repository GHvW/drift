
import Immutable, { Record, Map } from "immutable";
import { composeLeft } from "./functions/compose";
import { scan } from "./sequences/scan";
import { SimpleQueue } from "./supporting-data-structures/simpleQueue";
import { SimpleStack } from "./supporting-data-structures/simpleStack";

// export type AdjacencyMap<A> = Immutable.Map<Vertex<A>, Immutable.Set<Edge<A>>>;


// traverse :: (TraverseEnv<A>, AdjacencyMap<A>) => Generator<Edge<A>, void, void>
export function* traverse({ visited, inventory }, adjacencyMap) {
    const next = inventory.peek();
    const to = next?.get("to");
    const nextNode = adjacencyMap.get(to);

    if (next === undefined || nextNode === undefined) {
        return;
    }

    const newEnv =
        nextNode
            .reduce((env, edge) => {
                const nextVertex = edge.get("to");
                if (env.visited.has(nextVertex)) {
                    return env;
                }
                return {
                    visited: env.visited.add(nextVertex),
                    inventory: env.inventory.conj(edge),
                };
            }, { visited: visited, inventory: inventory.pop() });

    yield next;
    yield* traverse(newEnv, adjacencyMap);
}


// depthFirstTraverse :: (Vertex, AdjacencyMap<Vertex>) => Generator<Edge<Vertex>, void, void>>
export function* depthFirstTraverse(start, adjacencyMap) {
    yield* traverse(
        {
            visited: Immutable.Set.of(start),
            inventory: SimpleStack([Immutable.Map({ to: start, from: start })])
        },
        adjacencyMap);
}


// breadthFirstTraverse :: (Vertex, AdjacencyMap<Vertex>) => Generator<Edge<Vertex>, void, void>
export function* breadthFirstTraverse(start, adjacencyMap) {
    yield* traverse(
        {
            visited: Immutable.Set.of(start),
            inventory: SimpleQueue([Immutable.Map({ to: start, from: start })])
        },
        adjacencyMap);
}


// pathReducer :: (Map<Edge, Edge>, Edge) => Map<Edge, Edge>
function pathReducer(paths, edge) {
    const to = edge.get("to");
    const from = edge.get("from");
    return paths.set(to, from);
}


// depthFirstPaths :: (Vertex) => AdjacencyMap<Vertex> => Map<Edge, Edge>
export const depthFirstPaths = (start) =>
    composeLeft(
        depthFirstTraverse.bind(null, start),
        scan.bind(null, pathReducer, Immutable.Map()));

// breadthFirstPaths :: (Vertex) => AdjacencyMap<Vertex> => Map<Edge, Edge>
export const breadthFirstPaths = (start) =>
    composeLeft(
        breadthFirstTraverse.bind(null, start),
        scan.bind(null, pathReducer, Immutable.Map()));



// export function pathTo<A>(pathsTo: Immutable.Map<Vertex<A>, Vertex<A>>, from: Vertex<A>): Generator<Vertex<A>, void, void> {
export function* path(from, paths) {
    yield from;

    const next = pathsTo.get(from);
    if (!next || Immutable.is(next, from)) {
        return list;
    }

    yield* path(next, paths);
}

