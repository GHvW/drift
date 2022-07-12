// scan :: (Reducer, State, Iterable<A>) => Iterable<State>
type Reducer<A, B> = (b: B, a: A) => B;

function* scan<A, B>(
    reducer: Reducer<A, B>,
    init: B,
    iterable: Generator<A, void, undefined>
): Generator<B, void, undefined> {
    let state = init;
    for (let item of iterable) {
        const newState = reducer(state, item);
        yield newState;
        state = newState;
    }
}

export { scan };