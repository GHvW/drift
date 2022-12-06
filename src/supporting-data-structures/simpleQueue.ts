import { Memory } from './memory';

function SimpleQueue<A>(items: Array<A>): Memory<A> {
    return {
        peek() {
            return items[0];
        },
        pop() {
            items.shift();
            return SimpleQueue(items);
        },
        conj(item) {
            items.push(item);
            return SimpleQueue(items);
        },
    }
}

export { SimpleQueue };