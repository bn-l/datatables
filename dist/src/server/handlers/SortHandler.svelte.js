export default class SortHandler {
    table;
    constructor(table) {
        this.table = table;
    }
    set(field) {
        const sort = this.table['sort'];
        if (!sort || sort.field !== field) {
            this.asc(field);
        }
        else if (sort.direction === 'asc') {
            this.desc(field);
        }
        else if (sort.direction === 'desc') {
            this.asc(field);
        }
    }
    asc(field) {
        this.table['sort'] = { field, direction: 'asc' };
        this.table.setPage(1);
    }
    desc(field) {
        this.table['sort'] = { field, direction: 'desc' };
        this.table.setPage(1);
    }
}
