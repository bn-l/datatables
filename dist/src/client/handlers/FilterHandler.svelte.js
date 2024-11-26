import { isNotNull, parseField } from '../utils';
export default class FilterHandler {
    table;
    constructor(table) {
        this.table = table;
    }
    set(value, field, check = null, uuid) {
        this.table.setPage(1);
        const { callback, id, key } = parseField(field, uuid);
        const filter = { value, id, callback, check, key };
        this.table.filters = this.table.filters.filter(filter => filter.id !== id);
        if (isNotNull(value)) {
            this.table.filters.push(filter);
        }
    }
    unset(id) {
        this.table.setPage(1);
        this.table.filters = this.table.filters.filter(filter => filter.id !== id);
    }
}
