import { Record } from "immutable";

interface Edge<A> {
    from: A
    to: A
}

interface WeightedEdge<A> extends Edge<A> {
    weight: number
}

interface Graph<A> {
    vertices: Set<Record<A>>
    edges: Set<Record<Edge<A> | WeightedEdge<A>>> // TODO - might not work
}


// const one = Record<Edge<number>>({ from: 10, to: 30 });