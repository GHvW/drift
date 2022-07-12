export interface Memory<A> {
    peek(): A;
    pop(): Memory<A>;
    conj(item: A): Memory<A>;
}