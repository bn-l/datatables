import { check } from '..';
export default class SearchHandler {
    table;
    constructor(table) {
        this.table = table;
    }
    set(value, scope) {
        this.table.setPage(1);
        this.table['search'] = { value: value, scope: scope };
    }
    regex(pattern, scope) {
        this.table.setPage(1);
        this.table['search'] = { value: pattern, scope: scope, check: check.match };
    }
    clear() {
        this.table.setPage(1);
        this.table['search'] = { value: '' };
    }
}
