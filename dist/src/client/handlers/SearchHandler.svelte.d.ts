import { type TableHandler, type Field } from '..';
export default class SearchHandler<Row> {
    private table;
    constructor(table: TableHandler<Row>);
    set(value: string, scope?: Field<Row>[]): void;
    regex(pattern: string, scope?: Field<Row>[]): void;
    clear(): void;
}
