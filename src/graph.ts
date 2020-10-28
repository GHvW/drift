import { Set, Map, Record } from "immutable";

// interface Edge<A> {
//     from: A
//     to: A
// }


// use types instead? 
export type Edge<A> = { 
    from: A, 
    to: A 
}


// type WeightedEdge<A> = { weight: number } & Edge<A>;


// interface WeightedEdge<A> extends Edge<A> {
//     weight: number
// }


// type Graph<A> = {
//     vertices: Set<Record<A>>
//     edges: Set<Record<Edge<A> | WeightedEdge<A>>> // TODO - might not work
// }


export type AdjacencyMap<A> = Map<A, Set<Record<Edge<A>>>>;


// type WeightedAdjacencyMap<A> = Map<Record<A>, Set<Record<WeightedEdge<A>>>>;


interface IInventory<A> {
    peek(): A;
    pop(): IInventory<A>;
    conj(item: A): IInventory<A>;
}


// TODO real stack
function simpleStack<A>(...items: Array<A>): IInventory<A> {
    return {
        peek(): A {
            return items[items.length - 1];
        },
        pop(): IInventory<A> {
            items.pop();
            return simpleStack(...items);
        },
        conj(item: A): IInventory<A> {
            items.push(item);
            return simpleStack(...items);
        },
    }
}


// TODO real queue
function simpleQueue<A>(...items: Array<A>): IInventory<A> {
    return {
        peek(): A {
            return items[0];
        },
        pop(): IInventory<A> {
            items.shift();
            return simpleQueue(...items);
        },
        conj(item: A): IInventory<A> {
            items.push(item);
            return simpleQueue(...items);
        },
    }
}


interface TraverseEnv<A> {
    visited: Set<A>;
    inventory: IInventory<Record<Edge<A>>>;
}


export function* traverse<A>(map: AdjacencyMap<A>, { visited, inventory }: TraverseEnv<A>): Generator<Record<Edge<A>>, void, void> {
    const TO = "to";
    const next = inventory.peek();
    const to = next?.get(TO);
    const nextNode = map.get(to);

    if (next === undefined || nextNode === undefined) {
        return;
    }

    const newEnv =
        nextNode
            .reduce((env, edge) => {
                const nextVertex = edge.get(TO);
                if (env.visited.contains(nextVertex)) {
                    return env;
                }
                return { 
                    visited: env.visited.add(nextVertex), 
                    inventory: env.inventory.conj(edge),
                };
            }, { visited: visited, inventory: inventory.pop() });

    yield next;
    yield* traverse(map, newEnv) // refactor recursion out later
}


export function* depthFirstTraverse<A>(start: A, map: AdjacencyMap<A>): Generator<Record<Edge<A>>, void, void> {
    const startEdges = map.get(start)?.toArray() ?? [];
    const visitedStart = startEdges.map(edge => edge.get("to"));
    const initInventory = startEdges.reduce((init, edge) => init.conj(edge), simpleStack<Record<Edge<A>>>());

    yield* traverse(map, { visited: Set<A>(visitedStart), inventory: initInventory }); // if this self edge works, make it more explicit
}


export function* breadthFirstTraverse<A>(start: A, map: AdjacencyMap<A>): Generator<Record<Edge<A>>, void, void> {
    const startEdges = map.get(start) ?? Set<Record<Edge<A>>>();
    const visitedStart = startEdges.map(edge => edge.get("to")).add(start);
    const initInventory = startEdges.reduce((init, edge) => init.conj(edge), simpleQueue<Record<Edge<A>>>());

    yield* traverse(map, { visited: Set<A>(visitedStart), inventory: initInventory }); // if this self edge works, make it more explicit
}

type Traversal<A> = (start: A, map: AdjacencyMap<A>) => Generator<Record<Edge<A>>, void, void>;

function paths<A>(traversal: Traversal<A>): (start: A, map: AdjacencyMap<A>) => Map<A, A> {
    return (start, map) => {
        let paths = Map<A, A>();

        for (let val of traversal(start, map)) {
            paths = paths.set(val.get("to"), val.get("from"));
        }

        return paths;
    }
}


export const depthFirstPaths = paths(depthFirstTraverse);


export const breadthFirstPaths = paths(breadthFirstTraverse);

// const one = Record<Edge<number>>({ from: 10, to: 30 });