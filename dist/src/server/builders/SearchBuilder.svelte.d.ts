import type TableHandler from '../TableHandler.svelte';
export default class SearchBuilder<Row> {
    value: string;
    private timeout;
    private table;
    constructor(table: TableHandler<Row>);
    set(): void;
    clear(): void;
    private cleanup;
}
