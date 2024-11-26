export default class SearchBuilder {
    value = $state('');
    timeout = undefined;
    table;
    constructor(table) {
        this.table = table;
        this.cleanup();
    }
    set() {
        this.table['search'] = this.value;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.table.invalidate();
        }, 400);
    }
    clear() {
        this.value = '';
        this.table['search'] = '';
        this.table.invalidate();
    }
    cleanup() {
        this.table.on('clearSearch', () => this.clear());
    }
}
