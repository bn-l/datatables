import { parseField, sort } from '../utils';
export default class CalcultationBuilder {
    callback;
    precision;
    table;
    constructor(table, field) {
        this.table = table;
        this.callback = parseField(field).callback;
    }
    distinct(param) {
        const values = this.table.allRows.map(row => this.callback(row));
        const aggregate = values.reduce((acc, curr) => {
            if (Array.isArray(curr)) {
                for (const item of curr) {
                    acc[item] = (acc[item] ?? 0) + 1;
                }
                return acc;
            }
            acc[curr] = (acc[curr] ?? 0) + 1;
            return acc;
        }, {});
        const result = Object.entries(aggregate).map(([value, count]) => ({ value, count }));
        if (param?.sort) {
            const [field, direction] = param.sort;
            if (field === 'count') {
                result.sort((x, y) => sort.asc(x.value, y.value));
            }
            result.sort((a, b) => sort[direction](a[field], b[field]));
        }
        return result;
    }
    avg(param) {
        this.precision = param?.precision ?? 2;
        if (this.table.allRows.length === 0)
            return 0;
        const values = this.table.allRows.map(row => this.callback(row)).filter(Boolean);
        return this.round(values.reduce((acc, curr) => acc + curr, 0) / values.length);
    }
    sum(param) {
        this.precision = param?.precision ?? 2;
        const values = this.table.allRows.map(row => this.callback(row));
        return this.round(values.reduce((acc, curr) => acc + curr, 0));
    }
    bounds() {
        const values = this.table.allRows.map(row => this.callback(row));
        const numbers = values.filter(Boolean);
        if (numbers.length === 0)
            return [null, null];
        return [
            Math.min(...numbers),
            Math.max(...numbers)
        ];
    }
    round(value) {
        return Number(value.toFixed(this.precision));
    }
}
