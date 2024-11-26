import { check as comparator } from '../Comparator';
export default class FilterBuilder {
    value = $state('');
    id = Math.random().toString(36).substring(2, 15);
    filterHandler;
    field;
    check;
    constructor(filterHandler, field, check) {
        this.filterHandler = filterHandler;
        this.field = field;
        this.check = check ?? comparator.isLike;
        this.cleanup();
    }
    set(check) {
        this.filterHandler.set(this.value, this.field, check ?? this.check, this.id);
    }
    clear() {
        this.value = '';
        this.filterHandler.unset(this.id);
    }
    cleanup() {
        this.filterHandler['table'].on('clearFilters', () => this.clear());
    }
}
