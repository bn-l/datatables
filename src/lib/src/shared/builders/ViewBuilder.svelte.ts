import type { TableHandlerInterface, ColumnView } from '$lib/src/shared'

export default class ViewBuilder<Row>
{
    public  columns     = $state<ColumnView[]>([])
    private table       : TableHandlerInterface<Row>
    private interval    : NodeJS.Timeout
    private mutation    : MutationObserver

    constructor(table: TableHandlerInterface<Row>, columns: ColumnView[])
    {
        this.table      = table
        this.columns    = []
        this.interval   = setInterval(() => this.createColumns(columns), 200)
    }

    public toggle(name: string)
    {
        if (!this.table.element) return

        const column = this.columns.find(column => column.name === name)
        if (!column) return
        column.toggle()
    }

    private createColumns(columns: ColumnView[])
    {
        if (!this.table?.element) {
            return
        }
        clearInterval(this.interval)

        this.columns = columns.map(({ name, index, isVisible, isFrozen }) => {
            return {
                name,
                index,
                isVisible: isVisible === false ? false : true,
                isFrozen: isFrozen === true ? true : false,
                element: this.table.element,
                toggle: function() {
                    this.isVisible = !this.isVisible
                    this.element.querySelectorAll(`tr > *:nth-child(${this.index + 1})`).forEach((element: HTMLElement) => {
                        element.classList.toggle('hidden')
                    })
                }
            }
        })
        this.preset()
        this.mutation = new MutationObserver(() => {
            setTimeout(() => {
                this.preset()
            }, 2)
        })
        this.mutation.observe(this.table.element, { childList: true, subtree: true })
    }

    private preset()
    {
        let left = 0
        for (const { isVisible, isFrozen, index } of this.columns) {
            if (isFrozen === true) {
                left += this.freeze(index, left)
            }
            if (isVisible === false) {
                this.table.element.querySelectorAll(`tr > *:nth-child(${index + 1})`).forEach((element: HTMLElement) => {
                    element.classList.add('hidden')
                })
            }
        }
    }

    private freeze(index: number, left = 0)
    {
        const column = this.table.element.querySelector(`thead th:nth-child(${index + 1})`) as HTMLElement
        const { width } = column.getBoundingClientRect()

        this.table.element.querySelectorAll(`tr > *:nth-child(${index + 1})`).forEach((element: HTMLElement) => {
            element.style.position = 'sticky'
            element.style.left = left + 'px'
            element.style.width = width + 'px'
        })
        return width
    }

    public setPosition(current: number, destination: number)
    {
        this.table.element.querySelectorAll('tr').forEach(row => {
            const cells = [].slice.call(row.querySelectorAll('th, td'))
            if (current > destination) {
                cells[destination].parentNode.insertBefore(
                    cells[current],
                    cells[destination]
                )
            }
            else {
                cells[destination].parentNode.insertBefore(
                    cells[current],
                    cells[destination].nextSibling
                )
            }
        })
    }
}