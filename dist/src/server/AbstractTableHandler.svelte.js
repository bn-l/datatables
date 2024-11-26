import { EventDispatcher } from '../shared';
export default class AbstractTableHandler {
    selectBy;
    event = new EventDispatcher();
    search = $state('');
    sort = $state({});
    totalRows = $state(undefined);
    isLoading = $state(false);
    rowsPerPage = $state(10);
    currentPage = $state(1);
    filters = $state([]);
    filterCount = $derived(this.filters.length);
    rows = $state([]);
    rowCount = $derived(this.createRowCount());
    pages = $derived(this.createPages());
    pageCount = $derived(this.createPageCount());
    pagesWithEllipsis = $derived(this.createPagesWithEllipsis());
    selected = $state([]);
    isAllSelected = $derived(this.createIsAllSelected());
    element = $state(undefined);
    clientWidth = $state(1000);
    constructor(data, params) {
        this.rows = data;
        this.selectBy = params.selectBy ?? undefined;
        this.totalRows = params.totalRows;
        this.rowsPerPage = params.rowsPerPage ?? 10;
    }
    getState() {
        return {
            currentPage: this.currentPage,
            rowsPerPage: this.rowsPerPage,
            offset: this.rowsPerPage * (this.currentPage - 1),
            search: this.search,
            sort: this.sort.field ? this.sort : undefined,
            filters: this.filters.length > 0 ? this.filters : undefined,
            setTotalRows: (value) => this.totalRows = value
        };
    }
    createPages() {
        if (!this.rowsPerPage || !this.totalRows) {
            return undefined;
        }
        const pages = Array.from(Array(Math.ceil(this.totalRows / this.rowsPerPage)));
        return pages.map((_, i) => i + 1);
    }
    createPageCount() {
        if (!this.pages)
            return undefined;
        return this.pages.length;
    }
    createPagesWithEllipsis() {
        if (!this.pages) {
            return undefined;
        }
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
        else if (this.currentPage < this.pageCount - 3) {
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
                ...this.pages.slice(this.pageCount - 5, this.pageCount)
            ];
        }
    }
    createRowCount() {
        if (!this.rowsPerPage || !this.totalRows) {
            return {
                total: undefined,
                start: undefined,
                end: undefined,
                selected: this.selected.length
            };
        }
        return {
            total: this.totalRows,
            start: this.currentPage * this.rowsPerPage - this.rowsPerPage + 1,
            end: Math.min(this.currentPage * this.rowsPerPage, this.totalRows),
            selected: this.selected.length
        };
    }
    createIsAllSelected() {
        if (this.rows.length === 0) {
            return false;
        }
        const ids = this.rows.map(row => row[this.selectBy]);
        return ids.every(id => this.selected.includes(id));
    }
}
