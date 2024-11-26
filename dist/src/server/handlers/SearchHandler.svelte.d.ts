import type { TableHandler } from '..';
export default class SearchHandler<Row> {
    private table;
    constructor(table: TableHandler<Row>);
    clear(): void;
}
