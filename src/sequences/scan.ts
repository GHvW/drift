// scan :: (Reducer, State, Iterable<A>) => Iterable<State>
export type Reducer<A, B> = (b: A, a: B) => A;

function* scan<A, B>(
    reducer: Reducer<A, B>,
    init: A,
    iterable: Generator<B, void, undefined>
): Generator<A, void, undefined> {
    let state = init;
    for (let item of iterable) {
        const newState = reducer(state, item);
        yield newState;
        state = newState;
    }
}

export { scan };