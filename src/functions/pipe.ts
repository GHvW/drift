// pipe :: (Data, ...(Whatever => Whatever)) => Whatever
function pipe<A, B, C>(data: A, ab: (a: A) => B, bc: (b: B) => C): C {
    return bc(ab(data));
}

export { pipe };