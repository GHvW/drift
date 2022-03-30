function SimpleQueue(items) {
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