// scan :: (Reducer, State, Iterable<A>) => Iterable<State>
function* scan(reducer, init, iterable) {
    let state = init;
    for (let item in iterable) {
        const newState = reducer(state, item);
        yield newState;
        state = newState;
    }
}

export { scan };