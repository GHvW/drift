import { Memory } from './memory';

function SimpleStack<A>(items: Array<A>): Memory<A> {
    return {
        peek(): A {
            return items[items.length - 1];
        },
        pop(): Memory<A> {
            items.pop();
            return SimpleStack(items);
        },
        conj(item): Memory<A> {
            items.push(item);
            return SimpleStack(items);
        },
    }
}

export { SimpleStack };