import Immutable, { Record, RecordOf } from "immutable";


// ----------- Vertex ----------

export type VertexProps<A> = { value: A };

export type Vertex<A> = RecordOf<VertexProps<A>>;

// --------- Edge -----------

export type EdgeProps<A> = { from: Vertex<A>, to: Vertex<A> };

export type Edge<A> = RecordOf<EdgeProps<A>>


// --------------- Graph -------------

export type GraphProps<A> = {
    vertices: Immutable.Set<Vertex<A>>,
    edges: Immutable.Set<Edge<A>>
}

export type Graph<A> = RecordOf<GraphProps<A>>;