import { untrack } from 'svelte';
import AbstractTableHandler from './AbstractTableHandler.svelte';
import SortHandler from './handlers/SortHandler.svelte';
import FilterHandler from './handlers/FilterHandler.svelte';
import SelectHandler from './handlers/SelectHandler.svelte';
import PageHandler from './handlers/PageHandler.svelte';
import SearchHandler from './handlers/SearchHandler.svelte';
import ViewBuilder from '../shared/builders/ViewBuilder.svelte';
import SearchBuilder from './builders/SearchBuilder.svelte';
import FilterBuilder from './builders/FilterBuilder.svelte';
import AdvancedFilterBuilder from './builders/AdvancedFilterBuilder.svelte';
import CalculationBuilder from './builders/CalculationBuilder.svelte';
import SortBuilder from './builders/SortBuilder.svelte';
import CSVBuilder from './builders/CSVBuilder.svelte';
import RecordFilterBuilder from './builders/RecordFilterBuilder.svelte';
export default class TableHandler extends AbstractTableHandler {
    i18n;
    view;
    sortHandler;
    filterHandler;
    selectHandler;
    pageHandler;
    searchHandler;
    constructor(data = [], params = { rowsPerPage: null }) {
        super(data, params);
        this.translate(params.i18n);
        this.sortHandler = new SortHandler(this);
        this.filterHandler = new FilterHandler(this);
        this.selectHandler = new SelectHandler(this);
        this.pageHandler = new PageHandler(this);
        this.searchHandler = new SearchHandler(this);
    }
    setRows(data) {
        const scrollTop = this.element?.scrollTop ?? 0;
        this.rawRows = data;
        untrack(() => {
            this.event.dispatch('change');
            this.sortHandler.restore();
            if (this.element) {
                setTimeout(() => this.element.scrollTop = scrollTop, 2);
            }
        });
    }
    setRowsPerPage(value) {
        this.rowsPerPage = value;
        this.setPage(1);
    }
    setPage(value) {
        switch (value) {
            case 'previous': return this.pageHandler.previous();
            case 'next': return this.pageHandler.next();
            case 'last': return this.pageHandler.last();
            default: return this.pageHandler.goto(value);
        }
    }
    clearSearch() {
        this.searchHandler.clear();
        this.event.dispatch('clearSearch');
        this.setPage(1);
    }
    createSearch(scope) {
        return new SearchBuilder(this.searchHandler, scope);
    }
    createRecordFilter(records) {
        return new RecordFilterBuilder(records);
    }
    createSort(field, params) {
        return new SortBuilder(this.sortHandler, field, params);
    }
    clearFilters() {
        this.filters = [];
        this.event.dispatch('clearFilters');
        this.setPage(1);
    }
    createAdvancedFilter(field, check) {
        return new AdvancedFilterBuilder(this.filterHandler, field, check);
    }
    createFilter(field, check) {
        return new FilterBuilder(this.filterHandler, field, check);
    }
    select(value) {
        this.selectHandler.set(value);
    }
    selectAll(params = {}) {
        this.selectScope = (params.scope === 'all') ? 'all' : 'currentPage';
        this.selectHandler.all(this.selectScope);
    }
    getSelectedRows() {
        return this.selectHandler.getRows();
    }
    clearSelection() {
        this.selectHandler.clear();
    }
    on(event, callback) {
        this.event.add(event, callback);
    }
    createCalculation(field) {
        return new CalculationBuilder(this, field);
    }
    createCSV() {
        return new CSVBuilder(this);
    }
    createView(columns) {
        this.view = new ViewBuilder(this, columns);
        return this.view;
    }
    getView() {
        return this.view;
    }
    translate(i18n) {
        this.i18n = {
            ...{
                search: 'Search...',
                show: 'Show',
                entries: 'entries',
                filter: 'Filter',
                rowCount: 'Showing {start} to {end} of {total} entries',
                noRows: 'No entries found',
                previous: 'Previous',
                next: 'Next'
            },
            ...i18n
        };
    }
}
