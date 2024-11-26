export default class PageHandler {
    table;
    constructor(table) {
        this.table = table;
    }
    goto(page) {
        if (this.table.rowsPerPage) {
            if (page >= 1 && page <= this.table.pageCount) {
                this.table.currentPage = page;
                this.table['event'].dispatch('change');
            }
        }
    }
    previous() {
        this.goto(this.table.currentPage - 1);
    }
    next() {
        this.goto(this.table.currentPage + 1);
    }
    last() {
        this.goto(this.table.pageCount);
    }
}
