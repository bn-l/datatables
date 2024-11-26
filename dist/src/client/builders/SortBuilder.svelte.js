export default class SortBuilder {
    direction = $derived(this.createDirection());
    isActive = $derived(this.createIsActive());
    id = Math.random().toString(36).substring(2, 15);
    sortHandler;
    field;
    params;
    constructor(sortHandler, field, params) {
        this.sortHandler = sortHandler;
        this.field = field;
        this.params = params ?? {};
    }
    set() {
        this.sortHandler.set(this.field, this.id, this.params);
    }
    asc() {
        this.sortHandler.asc(this.field, this.id, this.params);
    }
    desc() {
        this.sortHandler.desc(this.field, this.id, this.params);
    }
    clear() {
        this.sortHandler.clear();
    }
    createIsActive() {
        if (this.id === this.sortHandler['table']['sort']?.id) {
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
