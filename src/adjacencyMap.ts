
import Immutable, { Record, Map } from "immutable";
import { composeLeft } from "./functions/compose";
import { scan } from "./sequences/scan";
import { SimpleQueue } from "./supporting-data-structures/simpleQueue";
import { SimpleStack } from "./supporting-data-structures/simpleStack";
import { Vertex, Edge } from "./graph";
import { Memory } from "./supporting-data-structures/memory";
import { partial, partial2 } from "./functions/partial";

export type AdjacencyMap<A> = Immutable.Map<Vertex<A>, Immutable.Set<Edge<A>>>;

type TranverseEnv<A> = {
    visited: Immutable.Set<Vertex<A>>,
    inventory: Memory<Edge<A>>
}

export function* traverse<A>(
    { visited, inventory }: TranverseEnv<A>,
    adjacencyMap: AdjacencyMap<A>
): Generator<Edge<A>, void, null> {
    const next = inventory.peek();
    // const to = next?.get("to");
    const to = next.to;
    const nextNode = adjacencyMap.get(to);

    if (next === undefined || nextNode === undefined) {
        return;
    }

    const newEnv =
        nextNode
            .reduce((env, edge) => {
                const nextVertex = edge.to;
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


export function* depthFirstTraverse<A>(
    start: Vertex<A>,
    adjacencyMap: AdjacencyMap<A>
): Generator<Edge<A>, void, null> {
    yield* traverse({
        visited: Immutable.Set.of(start),
        inventory: SimpleStack(adjacencyMap.get(start)?.toArray() ?? [])
    },
        adjacencyMap);
}


export function* breadthFirstTraverse<A>(
    start: Vertex<A>,
    adjacencyMap: AdjacencyMap<A>
): Generator<Edge<A>, void, null> {
    yield* traverse({
        visited: Immutable.Set.of(start),
        inventory: SimpleQueue(adjacencyMap.get(start)?.toArray() ?? [])
    },
        adjacencyMap);
}


// pathReducer :: (Map<Edge, Edge>, Edge) => Map<Edge, Edge>
function addPath<A>(paths: Immutable.Map<Edge<A>, Edge<A>>, edge: Edge<A>): Immutable.Map<Edge<A>, Edge<A>> {
    const to = edge.to;
    const from = edge.from;
    return paths.set(to, from);
}


// depthFirstPaths :: (Vertex) => AdjacencyMap<Vertex> => Map<Edge, Edge>
export function depthFirstPaths<A>(
    start: Vertex<A>
): (am: AdjacencyMap<Vertex<A>>) => Immutable.Map<Edge<A>, Edge<A>> {
    return composeLeft(
        partial(depthFirstTraverse, start),
        partial2(scan, addPath, Immutable.Map()));
}

// breadthFirstPaths :: (Vertex) => AdjacencyMap<Vertex> => Map<Edge, Edge>
export const breadthFirstPaths = <A>(start: Vertex<A>) =>
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


// degree :: (AdjacencyMap, Vertex) => number
export function degree<A>(node: Vertex<A>, adjacencyMap: AdjacencyMap<A>): number {
    return adjacencyMap
        .get(node)
        ?.size
        ?? 0;
}


export function averageDegree<A>(adjacencyMap: AdjacencyMap<A>): number {
    return adjacencyMap
        .map(it => it.size ?? 0)
        .reduce((total, n) => total + n, 0) / adjacencyMap.size;
}