function collect(collector, iterable) {
    return collector(iterable);
}

function toArray(iterable) {
    return [...iterable];
}

export { collect, toArray };