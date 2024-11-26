export default class SearchHandler {
    table;
    constructor(table) {
        this.table = table;
    }
    clear() {
        this.table['event'].dispatch('clearSearch');
    }
}
