<script>
	import { fly } from 'svelte/transition';
	import { session } from '$app/stores';
	import * as filter from '~/filters';
	import FilterPill from './FilterPill.svelte';

	const handle_remove_filter = (value) => () => filter.remove(value)
	const handle_clear_filter = () => filter.clear()
</script>

{#if Array.isArray($session.filters) && $session.filters.length > 0}
	<div transition:fly={{ y: 20 }} class="container filter-container">
		{#each $session.filters as { field_name, value } (field_name + value)}
			<FilterPill on:click={handle_remove_filter({ field_name, value })}>
				{value}
			</FilterPill>
		{/each}
		<button on:click={handle_clear_filter}>Clear</button>
	</div>
{/if}

<style>
	.filter-container {
		position: sticky;
		display: flex;
		gap: 0.5rem;
		bottom: 0;
		padding: 1rem 2rem;
		border-top: 1px solid #ccc;
		background-color: var(--color-site-bg);
		z-index: 1000;
	}
</style>
