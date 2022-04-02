function* takeWhile(predicate, iterable) {
    let { value, done } = iterable.next();
    while (!done && predicate(value)) {
        yield value;
        ({ value, done } = iterable.next());
    }
    yield value;
}