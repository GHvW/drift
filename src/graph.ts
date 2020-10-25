import { Collection, Record, Set, Map } from "immutable";

// interface Edge<A> {
//     from: A
//     to: A
// }

// use types instead? 
type Edge<A> = { 
    from: Record<A>, 
    to: Record<A> 
}

type WeightedEdge<A> = { weight: number } & Edge<A>;

// interface WeightedEdge<A> extends Edge<A> {
//     weight: number
// }

// let e = {
//     from: 0,
//     to: 1,
//     weight: 10
// }

// function takeEdge(e: Edge<number>): void {
//     console.log("edge: ", e);
// }

// let it = takeEdge(e);

type Graph<A> = {
    vertices: Set<Record<A>>
    edges: Set<Record<Edge<A> | WeightedEdge<A>>> // TODO - might not work
}

type AdjacencyMap<A> = Map<Record<A>, Set<Record<Edge<A>>>>;

type WeightedAdjacencyMap<A> = Map<Record<A>, Set<Record<WeightedEdge<A>>>>;

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
            return simpleStack(...items);
        },
        conj(item: A): IInventory<A> {
            items.push(item);
            return simpleStack(...items);
        },
    }
}

interface TraverseEnv<A> {
    visited: Set<Record<A>>;
    inventory: IInventory<Record<A>>;
}

const TO = "to";
const FROM = "from";

function* traverse<A>(
    map: AdjacencyMap<A>, 
    { visited, inventory }: TraverseEnv<A>): Generator<Record<A>, void, void> {

    const next = inventory.peek();
    if (next === undefined) {
        return;
    }

    const newEnv =
        map
            .get(next)
            .reduce((env, edge) => {
                const nextVertex = edge.get(TO);
                if (env.visited.contains(nextVertex)) {
                    return env;
                }
                return { 
                    visited: env.visited.add(nextVertex), 
                    inventory: env.inventory.conj(nextVertex),
                };
            }, { visited: visited, inventory: inventory.pop() });

    yield next;
    yield* traverse(map, newEnv)
}

// function* depthFirstTraverse<A>(map: AdjacencyMap<A>): Generator<> {

// }

// function* breadthFirstTraverse<A>(map: AdjacencyMap<A>): Generator<> {

// }



// const one = Record<Edge<number>>({ from: 10, to: 30 });