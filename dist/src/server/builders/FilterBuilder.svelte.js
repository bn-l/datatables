export default class FilterBuilder {
    value = $state('');
    timeout = undefined;
    filterHandler;
    field;
    constructor(filterHandler, field) {
        this.filterHandler = filterHandler;
        this.field = field;
        this.cleanup();
    }
    set() {
        this.filterHandler.set(this.value, this.field);
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.filterHandler['table'].invalidate();
        }, 400);
    }
    clear() {
        this.value = '';
        this.filterHandler.unset(this.field);
    }
    cleanup() {
        this.filterHandler['table'].on('clearFilters', () => this.clear());
    }
}
