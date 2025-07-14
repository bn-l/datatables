import type { Field, Check }    from '$lib/src/client'
import type FilterHandler       from '../handlers/FilterHandler.svelte'
import { check as comparator }  from '$lib/src/client/core'

export default class FilterBuilder<Row>
{
    public  value           = $state<unknown>('')
    private id              = Math.random().toString(36).substring(2, 15)
    private filterHandler   : FilterHandler<Row>
    private field           : Field<Row>
    private check           : Check

    constructor(filterHandler: FilterHandler<Row>, field: Field<Row>, check?: Check, value?: string)
    {
        this.filterHandler  = filterHandler
        this.field          = field
        this.check          = check ?? comparator.isLike
        if (value) {
            this.value = value
            this.filterHandler.set(this.value, this.field, this.check, this.id)
        }
        this.cleanup()
    }

    public set(check?: Check)
    {
        this.filterHandler.set(this.value, this.field, check ?? this.check, this.id)
    }

    public clear()
    {
        this.value = ''
        this.filterHandler.unset(this.id)
    }

    private cleanup()
    {
        this.filterHandler['table'].on('clearFilters', () => this.clear())
    }
}
