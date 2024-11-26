import type { State, Sort, Filter, TableParams } from './';
import { EventDispatcher } from '../shared';
export default class AbstractTableHandler<Row> {
    protected selectBy?: keyof Row;
    protected event: EventDispatcher;
    protected search: string;
    protected sort: Sort<Row>;
    totalRows: number;
    isLoading: boolean;
    rowsPerPage: number;
    currentPage: number;
    filters: Filter<Row>[];
    filterCount: number;
    rows: Row[];
    rowCount: {
        total: number;
        start: number;
        end: number;
        selected: number;
    };
    pages: number[];
    pageCount: number;
    pagesWithEllipsis: number[];
    selected: Row[keyof Row][];
    isAllSelected: boolean;
    element: HTMLElement;
    clientWidth: number;
    constructor(data: Row[], params: TableParams<Row>);
    getState(): State<Row>;
    private createPages;
    private createPageCount;
    private createPagesWithEllipsis;
    private createRowCount;
    private createIsAllSelected;
}
