import type { TableHandler } from '..';
export default class FilterHandler<Row> {
    private table;
    constructor(table: TableHandler<Row>);
    set(value: string | number, field: keyof Row): void;
    unset(field: keyof Row): void;
    clear(): void;
}
