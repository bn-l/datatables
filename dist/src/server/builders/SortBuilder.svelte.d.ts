import type SortHandler from '../handlers/SortHandler.svelte';
export default class SortBuilder<Row> {
    private sortHandler;
    private field;
    isActive: boolean;
    direction: "desc" | "asc";
    constructor(sortHandler: SortHandler<Row>, field: keyof Row);
    set(): void;
    asc(): void;
    desc(): void;
    private createIsActive;
    private createDirection;
}
