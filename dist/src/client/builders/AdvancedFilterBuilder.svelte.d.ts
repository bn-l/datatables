import type { Field, Check } from '..';
import type FilterHandler from '../handlers/FilterHandler.svelte';
export default class AdvancedFilterBuilder<Row> {
    criteria: unknown[];
    private uuid;
    private filterHandler;
    private collection;
    private field;
    private check;
    constructor(filterHandler: FilterHandler<Row>, field: Field<Row>, check?: Check);
    set(value: unknown, check?: Check): void;
    clear(): void;
    private cleanup;
}
