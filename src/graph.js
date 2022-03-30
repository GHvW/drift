import Immutable from "immutable";


// // ----------- Vertex ----------

// export type VertexProps<A> = { value: A };

// export type Vertex<A> = RecordOf<VertexProps<A>>;

// // --------- Edge -----------

// export type EdgeProps<A> = { from: Vertex<A>, to: Vertex<A> };

// export type Edge<A> = RecordOf<EdgeProps<A>>
function Edge({ from, to }) {
    return Immutable.Map({ from: from, to: to });
}

// // --------------- Graph -------------

// export type GraphProps<A> = {
//     vertices: Immutable.Set<Vertex<A>>,
//     edges: Immutable.Set<Edge<A>>
// }

// export type Graph<A> = RecordOf<GraphProps<A>>;

// Graph :: ({ Iterable<A>, Iterable<Edge<A>> }) => Immutable.Map<string, Set<A>>
function Graph({ vertices, edges }) {
    return Immutable.Map({
        vertices: Immutable.Set(vertices),
        edges: Immutable.Set(edges.map(Edge))
    });
}

export { Graph, Edge };