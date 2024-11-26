import AbstractTableHandler from './AbstractTableHandler.svelte';
import FetchHandler from './handlers/FetchHandler.svelte';
import SortHandler from './handlers/SortHandler.svelte';
import SelectHandler from './handlers/SelectHandler.svelte';
import PageHandler from './handlers/PageHandler.svelte';
import SearchHandler from './handlers/SearchHandler.svelte';
import FilterHandler from './handlers/FilterHandler.svelte';
import ViewBuilder from '../shared/builders/ViewBuilder.svelte';
import SearchBuilder from './builders/SearchBuilder.svelte';
import SortBuilder from './builders/SortBuilder.svelte';
import FilterBuilder from './builders/FilterBuilder.svelte';
export default class TableHandler extends AbstractTableHandler {
    fetchHandler;
    sortHandler;
    selectHandler;
    pageHandler;
    searchHandler;
    filterHandler;
    view;
    i18n;
    constructor(data = [], params = { rowsPerPage: 5 }) {
        super(data, params);
        this.i18n = this.translate(params.i18n);
        this.fetchHandler = new FetchHandler(this);
        this.sortHandler = new SortHandler(this);
        this.selectHandler = new SelectHandler(this);
        this.pageHandler = new PageHandler(this);
        this.searchHandler = new SearchHandler(this);
        this.filterHandler = new FilterHandler(this);
    }
    load(callback) {
        this.fetchHandler.set(callback);
    }
    invalidate() {
        this.fetchHandler.invalidate();
    }
    setRowsPerPage(value) {
        this.rowsPerPage = value;
        this.setPage(1);
    }
    setPage(value) {
        switch (value) {
            case 'previous': return this.pageHandler.previous();
            case 'next': return this.pageHandler.next();
            case 'last': return this.pageHandler.goto(this.pageCount);
            default: return this.pageHandler.goto(value);
        }
    }
    clearSearch() {
        this.searchHandler.clear();
    }
    createSearch() {
        return new SearchBuilder(this);
    }
    createSort(field) {
        if (typeof field === 'function') {
            throw new Error(`Invalid field argument: ${String(field)}. Function type arguments are not allowed in server-side mode`);
        }
        return new SortBuilder(this.sortHandler, field);
    }
    clearFilters() {
        this.filterHandler.clear();
        this.invalidate();
    }
    createFilter(field) {
        if (typeof field === 'function') {
            throw new Error(`Invalid field argument: ${String(field)}. Function type arguments are not allowed in server-side mode`);
        }
        return new FilterBuilder(this.filterHandler, field);
    }
    select(value) {
        this.selectHandler.set(value);
    }
    selectAll() {
        this.selectHandler.all();
    }
    clearSelection() {
        this.selectHandler.clear();
    }
    on(event, callback) {
        this.event.add(event, callback);
    }
    createView(columns) {
        this.view = new ViewBuilder(this, columns);
        return this.view;
    }
    getView() {
        return this.view;
    }
    translate(i18n) {
        return {
            ...{
                search: 'Search...',
                show: 'Show',
                entries: 'entries',
                filter: 'Filter',
                rowCount: 'Showing {start} to {end} of {total} entries',
                noRows: 'No entries found',
                previous: 'Previous',
                next: 'Next',
                selectedCount: '{count} of {total} row(s).'
            },
            ...i18n
        };
    }
}
