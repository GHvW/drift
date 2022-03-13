import Immutable, { Record, RecordOf } from "immutable";


// -------- Vertex -------------

export type VertexProps<A> = { value: A };

export type Vertex<A> = RecordOf<VertexProps<A>>;

// -------- Edge -------------


export type EdgeProps<A> = { from: Vertex<A>, to: Vertex<A> };

export type Edge<A> = RecordOf<EdgeProps<A>>


// -------- Adjacency Map ----------

export type AdjacencyMap<A> = Immutable.Map<Vertex<A>, Immutable.Set<Edge<A>>>;


interface IInventory<A> {
    peek(): A;
    pop(): IInventory<A>;
    conj(item: A): IInventory<A>;
}


// TODO real stack
function simpleStack<A>(items: Array<A>): IInventory<A> {
    return {
        peek(): A {
            return items[items.length - 1];
        },
        pop(): IInventory<A> {
            items.pop();
            return simpleStack(items);
        },
        conj(item: A): IInventory<A> {
            items.push(item);
            return simpleStack(items);
        },
    }
}


// TODO real queue
function simpleQueue<A>(items: Array<A>): IInventory<A> {
    return {
        peek(): A {
            return items[0];
        },
        pop(): IInventory<A> {
            items.shift();
            return simpleQueue(items);
        },
        conj(item: A): IInventory<A> {
            items.push(item);
            return simpleQueue(items);
        },
    }
}

// --------- Traversal -----------

interface TraverseEnv<A> {
    visited: Immutable.Set<Vertex<A>>;
    inventory: IInventory<Edge<A>>;
}


export function* traverse<A>(map: AdjacencyMap<A>, { visited, inventory }: TraverseEnv<A>): Generator<Edge<A>, void, void> {
    const next = inventory.peek();
    const to = next?.get("to");
    const nextNode = map.get(to);

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
    yield* traverse(map, newEnv);
}


export function* depthFirstTraverse<A>(
    initEdge: Record.Factory<EdgeProps<A>>,
    start: Vertex<A>,
    map: AdjacencyMap<A>
): Generator<Edge<A>, void, void> {

    yield* traverse(
        map,
        {
            visited: Immutable.Set.of<Vertex<A>>(start),
            inventory: simpleStack([initEdge({ to: start, from: start })])
        });
}


export function* breadthFirstTraverse<A>(
    initEdge: Record.Factory<EdgeProps<A>>,
    start: Vertex<A>,
    map: AdjacencyMap<A>
): Generator<Edge<A>, void, void> {

    yield* traverse(
        map,
        {
            visited: Immutable.Set.of<Vertex<A>>(start),
            inventory: simpleQueue([initEdge({ to: start, from: start })])
        });
}






type Traversal<A> = (initEdge: Record.Factory<EdgeProps<A>>, start: Vertex<A>, map: AdjacencyMap<A>) => Generator<Edge<A>, void, void>;


function paths<A>(
    traversal: Traversal<A>
): (
        initEdge: Record.Factory<EdgeProps<A>>,
        start: Vertex<A>,
        map: AdjacencyMap<A>) => Immutable.Map<Vertex<A>, Vertex<A>> {

    return (initEdge, start, map) => {
        let paths = Immutable.Map<Vertex<A>, Vertex<A>>();

        for (let val of traversal(initEdge, start, map)) {
            paths = paths.set(val.get("to"), val.get("from"));
        }

        return paths;
    }
}


export const depthFirstPaths = paths(depthFirstTraverse);


export const breadthFirstPaths = paths(breadthFirstTraverse);


export function* pathTo<A>(pathsTo: Immutable.Map<Vertex<A>, Vertex<A>>, from: Vertex<A>): Generator<Vertex<A>, void, void> {
    yield from;

    const next = pathsTo.get(from);
    if (!next || next.equals(from)) {
        return;
    }

    yield* pathTo(pathsTo, next);
}