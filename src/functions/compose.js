function compose(...fns) {
    return (a) => fns.reduceRight((state, fn) => fn(state), a);
}

function composeLeft(...fns) {
    return (a) => fns.reduce((state, fn) => fn(state), a);
}

export { compose, composeLeft };