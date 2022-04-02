// pipe :: (Data, ...(Whatever => Whatever)) => Whatever
function pipe(data, ...fns) {
    return fns.reduce((state, fn) => fn(state), data);
}

export { pipe };