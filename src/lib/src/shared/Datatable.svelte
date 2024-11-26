<script lang="ts">
    import type { Snippet } from 'svelte'
    import { type TableHandlerInterface, Search, RowsPerPage, RowCount, Pagination } from '$lib/src/shared'
    type T = $$Generic<Row>
    interface Props {
        table    : TableHandlerInterface<T>
        children : Snippet
        basic   ?: boolean
        headless?: boolean
        header  ?: Snippet
        footer  ?: Snippet
    }
    let { table, children, basic = false, headless = false, header = undefined, footer = undefined }: Props = $props()

    table.on('change', () => table.element ? table.element.scrollTop = 0 : '')
</script>

<div bind:clientWidth={table.clientWidth} class="main-container" class:svelte-simple-datatable={!headless}>

    <div class="header">
        {#if header}
            {@render header()}
        {:else if basic === true}
            <Search {table}/>
            <RowsPerPage {table}/>
        {/if}
    </div>

    <div bind:this={table.element} class="content thin-scrollbar">
        {@render children()}
    </div>

    <div class:divider={basic} class="footer">
        {#if footer}
            {@render footer()}
        {:else if basic === true}
            <RowCount {table}/>
            <Pagination {table}/>
        {/if}
    </div>

</div>

<style>
    .main-container {
        height: 100%;
        display: flex;
        flex-direction: column;
        background: inherit;
        border-radius: inherit;
    }
    .header, .footer {
        padding: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }
    .content {
        position: relative;
        height: 100%;
        overflow: auto;
        background: inherit;
    }
    .content :global(.hidden) {
        display: none;
    }
    .content::-webkit-scrollbar {
        width: 6px;
        height: 6px;
    }
    .content :global(table) {
        border-collapse: separate;
        border-spacing: 0;
        width: 100%;
        background: inherit;
    }
    .content :global(table thead) {
        position: sticky;
        inset-block-start: 0;
        background: inherit;
        z-index: 1;
    }
    .content :global(thead tr) {
        background: inherit;
    }
    .content :global(thead tr th) {
        background: inherit;
    }

    /* optional global style */
    .svelte-simple-datatable :global(thead tr:first-child th) {
        padding: 8px 20px;
        background: inherit;
    }
    .svelte-simple-datatable :global(tbody) {
        background: inherit;
    }
    .svelte-simple-datatable :global(tbody tr) {
        transition: background, 0.2s;
        background: inherit;
    }
    .svelte-simple-datatable :global(tbody tr:hover) {
        background: var(--grey-lighten-3, #fafafa);
    }
    .svelte-simple-datatable :global(tbody td) {
        padding: 4px 20px;
        border-right: 1px solid var(--grey-lighten, #eee);
        border-bottom: 1px solid var(--grey-lighten, #eee);
        background: inherit;
    }
    .svelte-simple-datatable :global(tbody td:last-child) {
        border-right: none;
    }
    .svelte-simple-datatable :global(u.highlight) {
        text-decoration: none;
        background: rgba(251, 192, 45, 0.6);
        border-radius: 2px;
    }
    .svelte-simple-datatable :global(footer.divider) {
        border-top: 1px solid var(--grey, #e0e0e0);
    }
</style>
