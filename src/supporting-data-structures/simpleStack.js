function SimpleStack(items) {
    return {
        peek() {
            return items[items.length - 1];
        },
        pop() {
            items.pop();
            return SimpleStack(items);
        },
        conj(item) {
            items.push(item);
            return SimpleStack(items);
        },
    }
}

export { SimpleStack };