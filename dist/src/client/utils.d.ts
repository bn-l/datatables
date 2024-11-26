import { type Row, type Field, type Check, type Criterion } from './';
export declare const isNull: (value: unknown) => boolean;
export declare const isNotNull: (value: unknown) => boolean;
export declare const stringify: (value?: unknown) => string;
export declare const parseField: (field: Field<Row>, uuid?: string) => {
    callback: (row: Row) => any;
    id: string;
    key: string;
};
export declare const match: (entry: unknown, value: unknown | Criterion[], compare?: Check) => any;
export declare const nestedFilter: (entry: unknown, value: unknown, highlight?: boolean, compare?: Check) => unknown;
export declare const deepEmphasize: (row: Row, callback: (row: Row) => unknown, value: string) => Row;
export declare const sort: {
    asc: (a: unknown, b: unknown, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions) => number;
    desc: (a: unknown, b: unknown, locales?: Intl.LocalesArgument, options?: Intl.CollatorOptions) => number;
};
