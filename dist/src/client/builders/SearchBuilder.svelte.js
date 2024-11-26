import {} from '..';
export default class SearchBuilder {
    value = $state('');
    scope;
    searchHandler;
    constructor(searchHandler, scope) {
        this.searchHandler = searchHandler;
        this.scope = scope;
        this.cleanup();
    }
    set() {
        this.searchHandler.set(this.value, this.scope);
    }
    regex() {
        this.searchHandler.regex(this.value, this.scope);
    }
    clear() {
        this.value = '';
        this.searchHandler.clear();
    }
    cleanup() {
        this.searchHandler['table'].on('clearSearch', () => this.clear());
    }
}
