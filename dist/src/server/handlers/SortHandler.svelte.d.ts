import type { TableHandler } from '..';
export default class SortHandler<Row> {
    private table;
    constructor(table: TableHandler<Row>);
    set(field: keyof Row): void;
    asc(field: keyof Row): void;
    desc(field: keyof Row): void;
}
