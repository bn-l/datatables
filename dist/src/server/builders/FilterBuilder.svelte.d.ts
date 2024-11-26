import type FilterHandler from '../handlers/FilterHandler.svelte';
export default class FilterBuilder<Row> {
    value: string;
    private timeout;
    private filterHandler;
    private field;
    constructor(filterHandler: FilterHandler<Row>, field: keyof Row);
    set(): void;
    clear(): void;
    private cleanup;
}
