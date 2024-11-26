import type { TableHandler } from '..';
export default class SelectHandler<Row> {
    private table;
    constructor(table: TableHandler<Row>);
    set(value: unknown): void;
    all(scope: 'all' | 'currentPage'): void;
    clear(): void;
    getRows(): Row[];
}
