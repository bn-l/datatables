import { parseField, match, nestedFilter, deepEmphasize } from './utils';
import { EventDispatcher } from '../shared';
export default class AbstractTableHandler {
    selectBy;
    selectScope = $state('currentPage');
    highlight;
    event = new EventDispatcher();
    rawRows = $state.raw([]);
    search = $state({ value: null, scope: undefined });
    sort = $state({});
    filters = $state([]);
    rowsPerPage = $state(10);
    currentPage = $state(1);
    element = $state(undefined);
    clientWidth = $state(1000);
    filterCount = $derived(this.filters.length);
    allRows = $derived(this.createAllRows());
    rows = $derived(this.createRows());
    rowCount = $derived(this.createRowCount());
    pages = $derived(this.createPages());
    pageCount = $derived(this.pages.length);
    pagesWithEllipsis = $derived(this.createPagesWithEllipsis());
    selected = $state([]);
    isAllSelected = $derived(this.createIsAllSelected());
    constructor(data, params) {
        this.rawRows = data;
        this.rowsPerPage = params.rowsPerPage ?? null;
        this.highlight = params.highlight ?? false;
        this.selectBy = params.selectBy;
    }
    createAllRows() {
        let allRows = $state.snapshot(this.rawRows);
        if (this.search.value) {
            allRows = allRows.filter((row) => {
                const fields = this.search.scope ?? Object.keys(row);
                const scope = fields.map((field) => parseField(field));
                for (const { key, callback } of scope) {
                    if (key) {
                        row[key] = nestedFilter(row[key], this.search.value, this.highlight);
                    }
                    else if (this.highlight) {
                        row = deepEmphasize(row, callback, this.search.value);
                    }
                }
                return scope.some(({ callback }) => {
                    return match(callback(row), this.search.value, this.search.check);
                });
            });
            this.event.dispatch('change');
        }
        if (this.filterCount > 0) {
            for (const { callback, value, check, key } of this.filters) {
                allRows = allRows.filter((row) => {
                    const checked = match(callback(row), value, check);
                    if (key) {
                        row[key] = nestedFilter(row[key], value, this.highlight, check);
                    }
                    else if (this.highlight && checked && value && typeof value === 'string') {
                        row = deepEmphasize(row, callback, value);
                    }
                    return checked;
                });
            }
            this.event.dispatch('change');
        }
        return allRows;
    }
    createRows() {
        if (!this.rowsPerPage)
            return this.allRows;
        return this.allRows.slice((this.currentPage - 1) * this.rowsPerPage, this.currentPage * this.rowsPerPage);
    }
    createRowCount() {
        const total = this.allRows.length;
        if (!this.rowsPerPage) {
            return { total: total, start: 1, end: total, selected: this.selected.length };
        }
        return {
            total: total,
            start: this.currentPage * this.rowsPerPage - this.rowsPerPage + 1,
            end: Math.min(this.currentPage * this.rowsPerPage, total),
            selected: this.selected.length
        };
    }
    createPages() {
        if (!this.rowsPerPage) {
            return [1];
        }
        const pages = Array.from(Array(Math.ceil(this.allRows.length / this.rowsPerPage)));
        return pages.map((_, i) => i + 1);
    }
    createPagesWithEllipsis() {
        if (this.pageCount <= 7) {
            return this.pages;
        }
        const ellipse = null;
        const firstPage = 1;
        const lastPage = this.pageCount;
        if (this.currentPage <= 4) {
            return [
                ...this.pages.slice(0, 5),
                ellipse,
                lastPage
            ];
        }
        else if (this.currentPage < lastPage - 3) {
            return [
                firstPage,
                ellipse,
                ...this.pages.slice(this.currentPage - 2, this.currentPage + 1),
                ellipse,
                lastPage
            ];
        }
        else {
            return [
                firstPage,
                ellipse,
                ...this.pages.slice(lastPage - 5, lastPage)
            ];
        }
    }
    createIsAllSelected() {
        if (this.rowCount.total === 0 || !this.selectBy) {
            return false;
        }
        const { callback } = parseField(this.selectBy);
        if (this.selectScope === 'all') {
            const identifiers = this.allRows.map(callback);
            return identifiers.every(id => this.selected.includes(id));
        }
        const identifiers = this.rows.map(callback);
        return identifiers.every(id => this.selected.includes(id));
    }
}
