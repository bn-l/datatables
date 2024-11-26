import { type Field } from '..';
import type SearchHandler from '../handlers/SearchHandler.svelte';
export default class SearchBuilder<Row> {
    value: string;
    private scope;
    private searchHandler;
    constructor(searchHandler: SearchHandler<Row>, scope?: Field<Row>[]);
    set(): void;
    regex(): void;
    clear(): void;
    private cleanup;
}
