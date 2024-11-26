import AbstractTableHandler from './AbstractTableHandler.svelte';
import type { Internationalization, Row, Field, Check, TableParams, ColumnView, TableHandlerInterface } from './';
import ViewBuilder from '../shared/builders/ViewBuilder.svelte';
import SearchBuilder from './builders/SearchBuilder.svelte';
import FilterBuilder from './builders/FilterBuilder.svelte';
import AdvancedFilterBuilder from './builders/AdvancedFilterBuilder.svelte';
import CalculationBuilder from './builders/CalculationBuilder.svelte';
import SortBuilder from './builders/SortBuilder.svelte';
import CSVBuilder from './builders/CSVBuilder.svelte';
import RecordFilterBuilder from './builders/RecordFilterBuilder.svelte';
export default class TableHandler<T extends Row = any> extends AbstractTableHandler<T> implements TableHandlerInterface<T> {
    i18n: Internationalization;
    private view;
    private sortHandler;
    private filterHandler;
    private selectHandler;
    private pageHandler;
    private searchHandler;
    constructor(data?: T[], params?: TableParams<T>);
    setRows(data: T[]): void;
    setRowsPerPage(value: number): void;
    setPage(value: number | 'previous' | 'next' | 'last'): void;
    clearSearch(): void;
    createSearch(scope?: Field<T>[]): SearchBuilder<T>;
    createRecordFilter(records?: Row[]): RecordFilterBuilder;
    createSort(field: Field<T>, params?: {
        locales: Intl.LocalesArgument;
        options: Intl.CollatorOptions;
    }): SortBuilder<T>;
    clearFilters(): void;
    createAdvancedFilter(field: Field<T>, check?: Check): AdvancedFilterBuilder<T>;
    createFilter(field: Field<T>, check?: Check): FilterBuilder<T>;
    select(value: unknown): void;
    selectAll(params?: {
        scope?: 'all' | 'currentPage';
    }): void;
    getSelectedRows(): T[];
    clearSelection(): void;
    on(event: 'change' | 'clearFilters' | 'clearSearch', callback: () => void): void;
    createCalculation(field: Field<T>): CalculationBuilder<T>;
    createCSV(): CSVBuilder<T>;
    createView(columns: ColumnView[]): ViewBuilder<T>;
    getView(): ViewBuilder<T>;
    private translate;
}
