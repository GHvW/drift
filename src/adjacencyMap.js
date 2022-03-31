
import Immutable, { Record, Map } from "immutable";
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


// type Traversal<A> = (start: Vertex<A>, map: AdjacencyMap<A>) => Generator<Edge<A>, void, void>;


// paths :: (Traversal<Vertex>) => (Vertex, AdjacencyMap<Vertex>) => Immutable.Map<Vertex, Vertex>
function* paths(traversal, start, adjacencyMap) {
    const inner = function* inner(map) {

    }

    for (let edge of traversal(start, map)) {
        const to = edge.get("to");
        const from = edge.get("from");
        paths = paths.set(to, from);
    }

    return paths;
}


export const depthFirstPaths = paths(depthFirstTraverse);


export const breadthFirstPaths = paths(breadthFirstTraverse);


// export function* pathTo<A>(pathsTo: Immutable.Map<Vertex<A>, Vertex<A>>, from: Vertex<A>): Generator<Vertex<A>, void, void> {
export function* pathTo(pathsTo, from) {
    yield from;

    const next = pathsTo.get(from);
    if (!next || Immutable.is(next, from)) {
        return;
    }

    yield* pathTo(pathsTo, next);
}

