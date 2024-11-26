export default class PageHandler {
    table;
    constructor(table) {
        this.table = table;
    }
    goto(number) {
        if (this.table.rowsPerPage && this.table.totalRows) {
            if (number >= 1 && number <= this.table.pageCount) {
                this.table.currentPage = number;
                this.table['event'].dispatch('change');
                this.table.invalidate();
            }
        }
        else {
            if (number >= 1) {
                this.table.currentPage = number;
                this.table['event'].dispatch('change');
                this.table.invalidate();
            }
        }
    }
    previous() {
        this.goto(this.table.currentPage - 1);
    }
    next() {
        this.goto(this.table.currentPage + 1);
    }
}
