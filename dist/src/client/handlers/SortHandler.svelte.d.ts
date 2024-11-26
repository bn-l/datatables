import type { Field, TableHandler, SortParams } from '..';
export default class SortHandler<Row> {
    private backup;
    private table;
    constructor(table: TableHandler<Row>);
    set(field: Field<Row>, uuid: string, params?: SortParams): void;
    asc(field: Field<Row>, uuid: string, { locales, options }?: SortParams): void;
    desc(field: Field<Row>, uuid: string, { locales, options }?: SortParams): void;
    clear(): void;
    restore(): void;
    private save;
}
