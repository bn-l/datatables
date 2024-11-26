import type { TableHandler } from '..';
export default class PageHandler<Row> {
    private table;
    constructor(table: TableHandler<Row>);
    goto(page: number): void;
    previous(): void;
    next(): void;
    last(): void;
}
