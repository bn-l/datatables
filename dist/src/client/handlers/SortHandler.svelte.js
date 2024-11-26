import { parseField, sort } from '../utils';
export default class SortHandler {
    backup;
    table;
    constructor(table) {
        this.table = table;
        this.backup = [];
    }
    set(field, uuid, params = {}) {
        const { id } = parseField(field, uuid);
        if (this.table['sort'].id !== id) {
            this.table['sort'].direction = null;
        }
        if (this.table['sort'].direction === null || this.table['sort'].direction === 'desc') {
            this.asc(field, id, params);
        }
        else if (this.table['sort'].direction === 'asc') {
            this.desc(field, id, params);
        }
    }
    asc(field, uuid, { locales, options } = {}) {
        if (!field)
            return;
        const { id, callback, key } = parseField(field, uuid);
        this.table['sort'] = { id, callback, direction: 'asc', key };
        this.table['rawRows'] = [...this.table['rawRows']].sort((x, y) => {
            const [a, b] = [callback(x), callback(y)];
            return sort.asc(a, b, locales, options);
        });
        this.save({ id, callback, direction: 'asc' });
        this.table.setPage(1);
    }
    desc(field, uuid, { locales, options } = {}) {
        if (!field)
            return;
        const { id, callback, key } = parseField(field, uuid);
        this.table['sort'] = { id, callback, direction: 'desc', key };
        this.table['rawRows'] = [...this.table['rawRows']].sort((x, y) => {
            const [a, b] = [callback(x), callback(y)];
            return sort.desc(a, b, locales, options);
        });
        this.save({ id, callback, direction: 'desc' });
        this.table.setPage(1);
    }
    clear() {
        this.backup = [];
        this.table['sort'] = {};
    }
    restore() {
        for (const { key, callback, direction, id } of this.backup) {
            const field = key ?? callback;
            this[direction](field, id);
        }
    }
    save(sort) {
        this.backup = this.backup.filter(item => item.id !== sort.id);
        if (this.backup.length >= 3) {
            const [_, slot2, slot3] = this.backup;
            this.backup = [slot2, slot3, sort];
        }
        else {
            this.backup = [...this.backup, sort];
        }
    }
}
