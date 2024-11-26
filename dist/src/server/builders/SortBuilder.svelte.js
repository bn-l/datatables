export default class SortBuilder {
    sortHandler;
    field;
    isActive = $derived(this.createIsActive());
    direction = $derived(this.createDirection());
    constructor(sortHandler, field) {
        this.sortHandler = sortHandler;
        this.field = field;
    }
    set() {
        this.sortHandler.set(this.field);
    }
    asc() {
        this.sortHandler.asc(this.field);
    }
    desc() {
        this.sortHandler.desc(this.field);
    }
    createIsActive() {
        if (this.field === this.sortHandler['table']['sort']?.field) {
            return true;
        }
        return false;
    }
    createDirection() {
        if (this.isActive === false)
            return null;
        return this.sortHandler['table']['sort']?.direction;
    }
}
