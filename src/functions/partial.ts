function partial<A, B, C>(
    fn: (a: A, b: B) => C,
    a: A
): (b: B) => C {
    return (b) => fn(a, b);
}

function partial2<A, B, C, D>(
    fn: (a: A, b: B, c: C) => D,
    a: A,
    b: B
): (c: C) => D {
    return (c) => fn(a, b, c);
}

export { partial, partial2 };