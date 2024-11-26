import { check as comparator } from '../Comparator';
export default class AdvancedFilterBuilder {
    criteria = $state([]);
    uuid = Math.random().toString(36).substring(2, 15);
    filterHandler;
    collection;
    field;
    check;
    constructor(filterHandler, field, check) {
        this.filterHandler = filterHandler;
        this.field = field;
        this.collection = [];
        this.check = check ?? comparator.isEqualTo;
        this.cleanup();
    }
    set(value, check) {
        if (this.collection.find(criterion => criterion.value === value)) {
            this.collection = this.collection.filter(criterion => criterion.value !== value);
        }
        else {
            this.collection = [{ value, check: check ?? this.check }, ...this.collection];
        }
        if (this.collection.length === 0) {
            return this.clear();
        }
        this.filterHandler.set(this.collection, this.field, comparator.whereIn, this.uuid);
        this.criteria = this.collection.map(criterion => criterion.value);
    }
    clear() {
        this.collection = [];
        this.criteria = [];
        this.filterHandler.unset(this.uuid);
    }
    cleanup() {
        this.filterHandler['table'].on('clearFilters', () => this.clear());
    }
}
