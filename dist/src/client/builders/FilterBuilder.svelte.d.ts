import type { Field, Check } from '..';
import type FilterHandler from '../handlers/FilterHandler.svelte';
export default class FilterBuilder<Row> {
    value: unknown;
    private id;
    private filterHandler;
    private field;
    private check;
    constructor(filterHandler: FilterHandler<Row>, field: Field<Row>, check?: Check);
    set(check?: Check): void;
    clear(): void;
    private cleanup;
}
