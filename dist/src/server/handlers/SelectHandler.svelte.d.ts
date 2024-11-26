import type { TableHandler } from '..';
export default class SelectHandler<Row> {
    private table;
    constructor(table: TableHandler<Row>);
    set(value: Row[keyof Row]): void;
    all(): void;
    clear(): void;
}
