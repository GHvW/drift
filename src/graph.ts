import Immutable from "immutable";


// ----------- Vertex ----------

export type VertexProps<A> = { value: A };

export type Vertex<A> = Immutable.RecordOf<VertexProps<A>>;

// // --------- Edge -----------

export type EdgeProps<A> = { from: Vertex<A>, to: Vertex<A> };

export type Edge<A> = Immutable.RecordOf<EdgeProps<A>>;

// const edgeConstructor: <A>(p: EdgeProps<A>) => Edge<A> = Record

// function Edge({ from, to }) {
//     return Immutable.Map({ from: from, to: to });
// }

// function WeightedEdge({ from, to, weight }) {
//     return Immutable.Map({ from: from, to: to, weight: weight });
// }

// // --------------- Graph -------------

export type GraphProps<A> = {
    vertices: Immutable.Set<Vertex<A>>,
    edges: Immutable.Set<Edge<A>>
}

export type Graph<A> = Immutable.RecordOf<GraphProps<A>>;

// Graph :: ({ Iterable<A>, Iterable<Edge<A>> }) => Immutable.Map<string, Set<A>>
// function Graph({ vertices, edges }) {
//     return Immutable.Map({
//         vertices: Immutable.Set(vertices),
//         edges: Immutable.Set(edges.map(Edge))
//     });
// }


function degreeSum<A>(graph: Graph<A>): number {
    return graph.edges.size * 2;
}

// export { Graph, Edge, degreeSum };
export { degreeSum };