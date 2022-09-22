function collect<A, B>(collector: (iter: Iterable<A>) => B, iterable: Iterable<A>): B {
    return collector(iterable);
}

function toArray<A>(iterable: Iterable<A>): Array<A> {
    return [...iterable];
}

export { collect, toArray };