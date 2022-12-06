
import Immutable, { Record, Map as ImMap } from "immutable";
import { Reducer, scan } from "./sequences/scan";
import { SimpleQueue } from "./supporting-data-structures/simpleQueue";
import { SimpleStack } from "./supporting-data-structures/simpleStack";
import { Vertex, Edge } from "./graph";
import { Memory } from "./supporting-data-structures/memory";
import { pipe } from "./functions/pipe";

export type AdjacencyMap<A> = ImMap<Vertex<A>, Immutable.Set<Edge<A>>>;

type TranverseEnv<A> = {
    visited: Immutable.Set<Vertex<A>>,
    inventory: Memory<Edge<A>>
}

export function* traverse<A>(
    { visited, inventory }: TranverseEnv<A>,
    adjacencyMap: AdjacencyMap<A>
): Generator<Edge<A>, void, undefined> {
    const next = inventory.peek();
    // const to = next?.get("to");
    const to = next?.to;
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
): Generator<Edge<A>, void, undefined> {
    yield* traverse({
        visited: Immutable.Set.of(start),
        inventory: SimpleStack(adjacencyMap.get(start)?.toArray() ?? [])
    },
        adjacencyMap);
}


export function* breadthFirstTraverse<A>(
    start: Vertex<A>,
    adjacencyMap: AdjacencyMap<A>
): Generator<Edge<A>, void, undefined> {
    yield* traverse({
        visited: Immutable.Set.of(start),
        inventory: SimpleQueue(adjacencyMap.get(start)?.toArray() ?? [])
    },
        adjacencyMap);
}


function updatePaths<A>(
    paths: ImMap<Vertex<A>, Vertex<A>>,
    edge: Edge<A>
): ImMap<Vertex<A>, Vertex<A>> {
    return paths.set(edge.to, edge.from);
}




// TODO - combine with bFP below?
export function depthFirstPaths<A>(
    start: Vertex<A>,
    graph: AdjacencyMap<A>
): Generator<ImMap<Vertex<A>, Vertex<A>>, void, undefined> {
    return pipe(
        graph,
        depthFirstTraverse
            .bind<
                null,
                Vertex<A>,
                [AdjacencyMap<A>],
                Generator<Edge<A>, void, undefined>
            >(null, start),
        scan
            .bind<
                null,
                Reducer<ImMap<Vertex<A>, Vertex<A>>, Edge<A>>,
                ImMap<Vertex<A>, Vertex<A>>,
                [Generator<Edge<A>, void, undefined>],
                Generator<ImMap<Vertex<A>, Vertex<A>>, void, undefined>
            >(null, updatePaths, ImMap<Vertex<A>, Vertex<A>>()));
}


export function breadthFirstPaths<A>(
    start: Vertex<A>,
    graph: AdjacencyMap<A>
): Generator<ImMap<Vertex<A>, Vertex<A>>, void, undefined> {
    return pipe(
        graph,
        breadthFirstTraverse
            .bind<
                null,
                Vertex<A>,
                [AdjacencyMap<A>],
                Generator<Edge<A>, void, undefined>
            >(null, start),
        scan
            .bind<
                null,
                Reducer<ImMap<Vertex<A>, Vertex<A>>, Edge<A>>,
                ImMap<Vertex<A>, Vertex<A>>,
                [Generator<Edge<A>, void, undefined>],
                Generator<ImMap<Vertex<A>, Vertex<A>>, void, undefined>
            >(null, updatePaths, ImMap<Vertex<A>, Vertex<A>>()));
}


export function* path<A>(
    from: Vertex<A>,
    paths: ImMap<Vertex<A>, Vertex<A>>
): Generator<Vertex<A>, void, undefined> {

    yield from;

    let next = paths.get(from);

    while (next) {
        yield next;
        next = paths.get(next);
    }
}


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