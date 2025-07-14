import type { Field, SortParams }   from '$lib/src/client'
import type SortHandler             from '../handlers/SortHandler.svelte'
import type { SortInterface }       from '$lib/src/shared'


export default class SortBuilder<Row> implements SortInterface
{
    public  direction       = $derived<'asc' | 'desc'>(this.createDirection())
    public  isActive        = $derived<boolean>(this.createIsActive())
    private id              = Math.random().toString(36).substring(2, 15)
    private sortHandler     : SortHandler<Row>
    private field           : Field<Row>
    private params          : SortParams

    constructor(sortHandler: SortHandler<Row>, field: Field<Row>, params: SortParams)
    {
        this.sortHandler    = sortHandler
        this.field          = field
        this.params         = params ?? {}
    }

    public set()
    {
        this.sortHandler.set(this.field, this.id, this.params)
    }

    public init(direction?: 'asc' | 'desc')
    {
        if (!direction) return this
        this[direction]()
        return this
    }

    public asc()
    {
        this.sortHandler.asc(this.field, this.id, this.params)
    }

    public desc()
    {
        this.sortHandler.desc(this.field, this.id, this.params)
    }

    public clear()
    {
        this.sortHandler.clear()
    }

    private createIsActive()
    {
        if (this.id === this.sortHandler['table']['sort']?.id) {
            return true
        }
        return false
    }

    private createDirection()
    {
        if (this.isActive === false) return null
        return this.sortHandler['table']['sort']?.direction
    }
}
