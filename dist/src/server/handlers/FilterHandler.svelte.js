export default class FilterHandler {
    table;
    constructor(table) {
        this.table = table;
    }
    set(value, field) {
        this.table.filters = this.table.filters.filter(filter => filter.field !== field && filter.value);
        if (value) {
            this.table.filters.push({ value, field });
        }
    }
    unset(field) {
        this.table.filters = this.table.filters.filter(filter => filter.field !== field);
    }
    clear() {
        this.table.filters = [];
        this.table['event'].dispatch('clearFilters');
    }
}
