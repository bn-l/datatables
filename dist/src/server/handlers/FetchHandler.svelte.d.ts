import type { State, TableHandler } from '..';
export default class FetchHandler<Row> {
    private table;
    private reload;
    constructor(table: TableHandler<Row>);
    set(callback: (state: State) => Promise<Row[]>): void;
    invalidate(): Promise<void>;
}
