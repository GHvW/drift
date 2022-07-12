
export function* takeWhile<A>(
    predicate: (a: A) => boolean,
    iterable: IterableIterator<A>
): Generator<A, void, null> {
    let { value, done } = iterable.next();
    while (!done && predicate(value)) {
        yield value;
        ({ value, done } = iterable.next());
    }
    yield value;
}