import type { Field, SortParams } from '..';
import type SortHandler from '../handlers/SortHandler.svelte';
export default class SortBuilder<Row> {
    direction: "desc" | "asc";
    isActive: boolean;
    private id;
    private sortHandler;
    private field;
    private params;
    constructor(sortHandler: SortHandler<Row>, field: Field<Row>, params: SortParams);
    set(): void;
    asc(): void;
    desc(): void;
    clear(): void;
    private createIsActive;
    private createDirection;
}
