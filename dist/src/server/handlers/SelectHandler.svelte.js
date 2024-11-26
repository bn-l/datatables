export default class SelectHandler {
    table;
    constructor(table) {
        this.table = table;
    }
    set(value) {
        if (this.table.selected.includes(value)) {
            this.table.selected = this.table.selected.filter((item) => item !== value);
        }
        else {
            this.table.selected = [value, ...this.table.selected];
        }
    }
    all() {
        const selection = this.table.rows.map((row) => row[this.table['selectBy']]);
        if (this.table.isAllSelected) {
            this.table.selected = this.table.selected.filter(item => selection.includes(item) === false);
        }
        else {
            this.table.selected = [...selection, ...this.table.selected];
        }
    }
    clear() {
        this.table.selected = [];
    }
}
