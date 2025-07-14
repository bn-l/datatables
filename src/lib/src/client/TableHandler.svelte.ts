import { untrack }              from 'svelte'
import AbstractTableHandler     from './AbstractTableHandler.svelte'

import SortHandler              from './handlers/SortHandler.svelte'
import FilterHandler            from './handlers/FilterHandler.svelte'
import QueryHandler             from './handlers/QueryHandler.svelte'
import SelectHandler            from './handlers/SelectHandler.svelte'
import PageHandler              from './handlers/PageHandler.svelte'
import SearchHandler            from './handlers/SearchHandler.svelte'

import type { Internationalization, Row, Field, Check, TableParams, ColumnView, TableHandlerInterface } from '$lib/src/client'

import ViewBuilder              from '../shared/builders/ViewBuilder.svelte'
import SearchBuilder            from './builders/SearchBuilder.svelte'
import FilterBuilder            from './builders/FilterBuilder.svelte'
import QueryBuilder             from './builders/QueryBuilder.svelte'
import AdvancedFilterBuilder    from './builders/AdvancedFilterBuilder.svelte'
import CalculationBuilder       from './builders/CalculationBuilder.svelte'
import SortBuilder              from './builders/SortBuilder.svelte'
import CSVBuilder               from './builders/CSVBuilder.svelte'
import RecordFilterBuilder      from './builders/RecordFilterBuilder.svelte'


export default class TableHandler<T extends Row = any> extends AbstractTableHandler<T> implements TableHandlerInterface<T>
{
    public  i18n            : Internationalization
    private view            : ViewBuilder<T>
    private sortHandler     : SortHandler<T>
    private filterHandler   : FilterHandler<T>
    private queryHandler    : QueryHandler<T>
    private selectHandler   : SelectHandler<T>
    private pageHandler     : PageHandler<T>
    private searchHandler   : SearchHandler<T>

    constructor(data: T[] = [], params: TableParams<T> = { rowsPerPage: null })
    {
        super(data, params)
        this.translate(params.i18n)
        this.sortHandler    = new SortHandler(this)
        this.filterHandler  = new FilterHandler(this)
        this.queryHandler   = new QueryHandler(this)
        this.selectHandler  = new SelectHandler(this)
        this.pageHandler    = new PageHandler(this)
        this.searchHandler  = new SearchHandler(this)
    }

    public setRows(data: T[]): void
    {
        const scrollTop = this.element?.scrollTop ?? 0
        this.rawRows = data
        untrack(() => {
            this.event.dispatch('change')
            this.sortHandler.restore()
            if (this.element) {
                setTimeout(() => this.element.scrollTop = scrollTop, 2)
            }
        })
    }

    public setRowsPerPage(value: number): void
    {
        this.rowsPerPage = value
        this.setPage(1)
    }

    public setPage(value: number | 'previous' | 'next' | 'last'): void
    {
        switch (value) {
            case 'previous' : return this.pageHandler.previous()
            case 'next'     : return this.pageHandler.next()
            case 'last'     : return this.pageHandler.last()
            default         : return this.pageHandler.goto(value as number)
        }
    }

    public createSearch(scope?: Field<T>[], value?: string): SearchBuilder<T>
    {
        return new SearchBuilder(this.searchHandler, scope, value)
    }

    public clearSearch(): void
    {
        this.searchHandler.clear()
        this.event.dispatch('clearSearch')
        this.setPage(1)
    }

    public createRecordFilter(records?: Row[]): RecordFilterBuilder
    {
        return new RecordFilterBuilder(records)
    }

    public createSort(field: Field<T>, init?: 'asc' | 'desc', params?: { locales: Intl.LocalesArgument, options: Intl.CollatorOptions}): SortBuilder<T>
    {
        return new SortBuilder(this.sortHandler, field, params, init)
    }

    public clearSort()
    {
        this.sortHandler.clear()
    }

    public clearFilters(): void
    {
        this.filters = []
        this.event.dispatch('clearFilters')
        this.setPage(1)
    }

    public createAdvancedFilter(field: Field<T>, check?: Check): AdvancedFilterBuilder<T>
    {
        return new AdvancedFilterBuilder(this.filterHandler, field, check)
    }

    public createFilter(field: Field<T>, value?: string, check?: Check): FilterBuilder<T>
    {
        return new FilterBuilder(this.filterHandler, field, check, value)
    }

    public createQuery(): QueryBuilder<T>
    {
        return new QueryBuilder(this.queryHandler)
    }

    public select(value: unknown): void
    {
        this.selectHandler.set(value)
    }

    public selectAll(params: { scope?: 'all' | 'currentPage' } = {}): void
    {
        this.selectScope = (params.scope === 'all') ? 'all' : 'currentPage'
        this.selectHandler.all(this.selectScope)
    }

    public getSelectedRows(): T[]
    {
        return this.selectHandler.getRows()
    }

    public clearSelection(): void
    {
        this.selectHandler.clear()
    }

    public on(event: 'change' | 'clearFilters' | 'clearSearch', callback: () => void)
    {
        this.event.add(event, callback)
    }

    public createCalculation(field: Field<T>): CalculationBuilder<T>
    {
        return new CalculationBuilder(this, field)
    }

    public createCSV(): CSVBuilder<T>
    {
        return new CSVBuilder(this)
    }

    public createView(columns: ColumnView[]): ViewBuilder<T>
    {
        this.view = new ViewBuilder(this, columns)
        return this.view
    }

    public getView(): ViewBuilder<T>
    {
        return this.view
    }

    private translate(i18n: Internationalization): void
    {
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
        }
    }
}
