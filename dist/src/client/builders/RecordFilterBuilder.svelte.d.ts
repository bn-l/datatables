import type { Row } from '..';
export default class RecordFilterBuilder {
    value: string;
    records: readonly Row[];
    private rawRecords;
    private filter;
    constructor(records: Row[]);
    set(): void;
    private createRecords;
}
