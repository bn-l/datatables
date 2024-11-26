
<Datatable {table}>
    {#snippet header()}
        <input
            type="text"
            bind:value={search.value}
            oninput={() => search.set()}
            placeholder="Search..."
            class="input input-bordered w-full max-w-xs"
        />
    {/snippet}
    <table class="table">
        <thead>
            <tr>
                <ThSort {table} field="sentAt">Date</ThSort>
                <ThSort {table} field="fromName">From</ThSort>
                <ThSort {table} field="toName">To</ThSort>
                <ThSort {table} field="amount">Amount</ThSort>
                <ThSort {table} field="method">Method</ThSort>
                <ThSort {table} field="confirmedSent">Status</ThSort>
            </tr>
        </thead>
        <tbody>
            {#each table.rows as row}
                <tr>
                    <td>{row.sentAt.toLocaleDateString()}</td>
                    <td>{row.fromName}</td>
                    <td>{row.toName}</td>
                    <td>${row.amount.toFixed(2)}</td>
                    <td>{row.method}</td>
                    <td>
                        {#if row.confirmedSent}
                            <span class="badge badge-success"
                                >Confirmed</span
                            >
                        {:else}
                            <span class="badge badge-warning"
                                >Pending</span
                            >
                        {/if}
                    </td>
                </tr>
            {/each}
        </tbody>
    </table>
    {#snippet footer()}
        <RowCount {table} />
        <Pagination {table} />
    {/snippet}
</Datatable>


<script lang="ts">
    import Datatable from '$lib/src/shared/Datatable.svelte'
    import ThSort from '$lib/src/shared/ThSort.svelte'
    import RowCount from '$lib/src/shared/RowCount.svelte'
    import Pagination from '$lib/src/shared/Pagination.svelte'
    import { faker } from '@faker-js/faker';
    import { TableHandler } from '$lib/src/client'

    function randomId() {
        return (Math.random() * 100000).toFixed();
    }

    const data = [
        {
            id: randomId(),
            fromName: faker.person.fullName(),
            toName: faker.person.fullName(),
            amount: faker.number.float({ min: 10, max: 200 }),
            method: "stripe",
            sentAt: faker.date.recent({ days: 10 }),
            confirmedSent: faker.datatype.boolean(),
        },
        {
            id: randomId(),
            fromName: faker.person.fullName(),
            toName: faker.person.fullName(),
            amount: faker.number.float({ min: 10, max: 200 }),
            method: "paypal",
            sentAt: faker.date.recent({ days: 10 }),
            confirmedSent: faker.datatype.boolean(),
        },
        {
            id: randomId(),
            fromName: faker.person.fullName(),
            toName: faker.person.fullName(),
            amount: faker.number.float({ min: 10, max: 200 }),
            method: faker.helpers.arrayElement([
                "stripe",
                "paypal",
                "wise",
            ]),
            sentAt: faker.date.recent({ days: 10 }),
            confirmedSent: faker.datatype.boolean(),
        },
        {
            id: randomId(),
            fromName: faker.person.fullName(),
            toName: faker.person.fullName(),
            amount: faker.number.float({ min: 10, max: 200 }),
            method: "stripe",
            sentAt: faker.date.recent({ days: 10 }),
            confirmedSent: faker.datatype.boolean(),
        },
        {
            id: randomId(),
            fromName: faker.person.fullName(),
            toName: faker.person.fullName(),
            amount: faker.number.float({ min: 10, max: 200 }),
            method: "wise",
            sentAt: faker.date.recent({ days: 10 }),
            confirmedSent: faker.datatype.boolean(),
        },
    ];


    const table = new TableHandler(data, { rowsPerPage: 10 });
    const search = table.createSearch()
</script>

