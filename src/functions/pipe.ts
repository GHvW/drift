function pipe<A, B, C>(
    data: A,
    ab: (a: A) => B,
    bc: (b: B) => C
): C {
    return bc(ab(data));
}

function pipe3<A, B, C, D>(
    data: A,
    ab: (a: A) => B,
    bc: (b: B) => C,
    cd: (c: C) => D
): D {
    return cd(bc(ab(data)));
}


export { pipe, pipe3 };