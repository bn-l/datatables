export default class EventDispatcher {
    listeners = {
        change: [],
        clearFilters: [],
        clearSearch: []
    };
    queue = new Set();
    add(event, callback) {
        this.listeners[event].push(callback);
    }
    async dispatch(event) {
        this.queue.add(event);
        await new Promise((resolve) => setTimeout(resolve, 40));
        if (this.queue.size > 0) {
            this.run();
        }
        this.queue.clear();
    }
    run() {
        for (const event of this.queue) {
            for (const callback of this.listeners[event]) {
                callback();
            }
        }
        // console.log(this.queue)
    }
}
