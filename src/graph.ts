import { Collection, Record, Set, Map } from "immutable";

// interface Edge<A> {
//     from: A
//     to: A
// }

// use types instead? 
type Edge<A> = { 
    from: A, 
    to: A 
}

type WeightedEdge<A> = { weight: number } & Edge<A>;

// interface WeightedEdge<A> extends Edge<A> {
//     weight: number
// }

let e = {
    from: 0,
    to: 1,
    weight: 10
}

function takeEdge(e: Edge<number>): void {
    console.log("edge: ", e);
}

let it = takeEdge(e);

type Graph<A> = {
    vertices: Set<Record<A>>
    edges: Set<Record<Edge<A> | WeightedEdge<A>>> // TODO - might not work
}

type AdjacencyMap<A> = {
    map: Map<Record<A>, Set<Record<Edge<A>>>>;
}

type WeightedAdjacencyMap<A> = {
    map: Map<Record<A>, Set<Record<WeightedEdge<A>>>>;
}


function* traverse<A>(
    map: AdjacencyMap<A>, 
    visited: Set<Record<A>>, 
    memory: Collection.Indexed<A>): Generator<Record<A>, void, void> {

}

function* depthFirstTraverse<A>(map: AdjacencyMap<A>): Generator<> {

}

function* breadthFirstTraverse<A>(map: AdjacencyMap<A>): Generator<> {

}



// const one = Record<Edge<number>>({ from: 10, to: 30 });