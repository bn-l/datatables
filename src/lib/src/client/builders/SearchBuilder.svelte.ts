import { type Field }       from '$lib/src/client'
import type SearchHandler   from '../handlers/SearchHandler.svelte'

export default class SearchBuilder<Row>
{
    public  value           = $state<string>('')
    private scope           : Field<Row>[]
    private searchHandler   : SearchHandler<Row>

    constructor(searchHandler: SearchHandler<Row>, scope?: Field<Row>[], value?: string)
    {
        this.searchHandler  = searchHandler
        this.scope          = scope
        if (value) {
            this.value = value
            this.searchHandler.set(this.value, this.scope)
        }
        this.cleanup()
    }

    public set()
    {
        this.searchHandler.set(this.value, this.scope)
    }

    public recursive()
    {
        this.searchHandler.recursive(this.value, this.scope)
    }

    public regex()
    {
        this.searchHandler.regex(this.value, this.scope)
    }

    public clear()
    {
        this.value = ''
        this.searchHandler.clear()
    }

    private cleanup()
    {
        this.searchHandler['table'].on('clearSearch', () => this.clear())
    }
}
