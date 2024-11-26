import type { Field, TableHandler } from '..';
type Sort = [key: 'value' | 'count', direction: 'asc' | 'desc'];
export default class CalcultationBuilder<Row> {
    private callback;
    private precision;
    private table;
    constructor(table: TableHandler<Row>, field: Field<Row>);
    distinct(param?: {
        sort: Sort;
    }): {
        value: string;
        count: number;
    }[];
    avg(param?: {
        precision: number;
    }): number;
    sum(param?: {
        precision: number;
    }): number;
    bounds(): number[];
    private round;
}
export {};
