export default class FetchHandler {
    table;
    reload;
    constructor(table) {
        this.table = table;
    }
    set(callback) {
        this.reload = callback;
    }
    async invalidate() {
        if (!this.reload)
            return;
        this.table.isLoading = true;
        const state = this.table.getState();
        const data = await this.reload(state);
        this.table.isLoading = false;
        if (data) {
            this.table.rows = data;
        }
    }
}
