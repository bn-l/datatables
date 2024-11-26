import type { TableHandler } from '..';
export default class CSVBuilder<Row> {
    private table;
    constructor(table: TableHandler<Row>);
    download(filename: string): void;
    get(): string;
    private getRows;
    private getHeader;
}
