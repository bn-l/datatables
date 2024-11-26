import type { TableHandlerInterface, ColumnView } from '..';
export default class ViewBuilder<Row> {
    columns: ColumnView[];
    private table;
    private interval;
    private mutation;
    constructor(table: TableHandlerInterface<Row>, columns: ColumnView[]);
    toggle(name: string): void;
    private createColumns;
    private preset;
    private freeze;
}
