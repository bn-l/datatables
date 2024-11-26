import type { TableHandler } from '..';
export default class PageHandler<Row> {
    private table;
    constructor(table: TableHandler<Row>);
    goto(number: number): void;
    previous(): void;
    next(): void;
}
