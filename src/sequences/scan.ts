// scan :: (Reducer, State, Iterable<A>) => Iterable<State>
type Reducer<A, B> = (b: B, a: A) => B;

function* scan<A, B>(
    reducer: Reducer<A, B>,
    init: B,
    iterable: Iterable<A>
): Generator<B, void, null> {
    let state = init;
    for (let item of iterable) {
        const newState = reducer(state, item);
        yield newState;
        state = newState;
    }
}

export { scan };