function compose<A, B, C>(bc: (b: B) => C, ab: (a: A) => B): (a: A) => C {
    return (a) => bc(ab(a));
}

function composeLeft<A, B, C>(ab: (a: A) => B, bc: (b: B) => C): (a: A) => C {
    return (a) => bc(ab(a));
}

export { compose, composeLeft };