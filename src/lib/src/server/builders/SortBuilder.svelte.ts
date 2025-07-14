import type SortHandler         from '../handlers/SortHandler.svelte'
import type { SortInterface }   from '$lib/src/shared'

export default class SortBuilder<Row> implements SortInterface
{
    private sortHandler : SortHandler<Row>
    private field       : keyof Row
    public  isActive    = $derived<boolean>(this.createIsActive())
    public  direction   = $derived<'asc' | 'desc'>(this.createDirection())

    constructor(sortHandler: SortHandler<Row>, field: keyof Row)
    {
        this.sortHandler = sortHandler
        this.field       = field
    }

    public set()
    {
        this.sortHandler.set(this.field)
    }

    public init(direction?: 'asc' | 'desc')
    {
        if (!direction) return this
        this[direction]()
        return this
    }

    public asc()
    {
        this.sortHandler.asc(this.field)
    }

    public desc()
    {
        this.sortHandler.desc(this.field)
    }

    private createIsActive()
    {
        if (this.field === this.sortHandler['table']['sort']?.field) {
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
