import { Set, Map } from "immutable";

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

export type AdjacencyMap<A> = Map<A, Set<Edge<A>>>;

// type WeightedAdjacencyMap<A> = Map<Record<A>, Set<Record<WeightedEdge<A>>>>;

interface IInventory<A> {
    peek(): A;
    pop(): IInventory<A>;
    conj(item: A): IInventory<A>;
}

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
    inventory: IInventory<Edge<A>>;
}

// const TO = "to";
// const FROM = "from";

export function* traverse<A>(map: AdjacencyMap<A>, { visited, inventory }: TraverseEnv<A>): Generator<Edge<A>, void, void> {

    const next = inventory.peek();
    const to = next.to;
    const nextNode = map.get(to);
    if (to === undefined || nextNode === undefined) {
        return;
    }

    const newEnv =
        nextNode
            .reduce((env, edge) => {
                const nextVertex = edge.to;
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

export function* depthFirstTraverse<A>(start: A, map: AdjacencyMap<A>): Generator<Edge<A>, void, void> {
    yield* traverse(map, { visited: Set<A>([start]), inventory: simpleStack({ from: start, to: start }) }); // if this self edge works, make it more explicit
}

export function* breadthFirstTraverse<A>(start: A, map: AdjacencyMap<A>): Generator<Edge<A>, void, void> {
    yield* traverse(map, { visited: Set<A>([start]), inventory: simpleQueue({ from: start, to: start }) }); // if this self edge works, make it more explicit
}

// export function depthFirstPaths<A>(start: A, map: AdjacencyMap<A>): Map<A, A> {
//     const dfs = (start: A, paths: Map<A, A>, map: AdjacencyMap<A>) => {
//         for (let val in depthFirstTraverse(start, map)) {

//         }
//     };

//     return dfs(start, Map(), map);
// }

// const one = Record<Edge<number>>({ from: 10, to: 30 });