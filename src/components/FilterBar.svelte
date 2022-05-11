<script>
	import { fly } from 'svelte/transition';
	import { session } from '$app/stores';
	import * as filter from '~/filters';
	import FilterPill from './FilterPill.svelte';

	const handle_remove_filter = (value) => () => filter.remove(value);
	const handle_clear_filter = () => filter.clear();
</script>

{#if Array.isArray($session.filters) && $session.filters.length > 0}
	<div transition:fly={{ y: 20 }} class="filter-container">
		<div class="filter-label">Filters</div>
		<ul class="filter-list">
			{#each $session.filters as { field_name, value } (field_name + value)}
				<li>
					<FilterPill
						text={value}
						on:click={handle_remove_filter({ field_name, value })}
					/>
				</li>
			{/each}
		</ul>
		<button class="filter-btn-clear" on:click={handle_clear_filter}
			>Clear filters</button
		>
	</div>
{/if}

<style>
	.filter-container {
		position: sticky;
		display: grid;
		grid-template-columns: 3rem 1fr 6rem;
		gap: 0.5rem;
		bottom: 0;
		padding: 1rem 2rem;
		border-top: 4px solid var(--color-ocean-100);
		background-color: var(--color-site-bg);
		z-index: 1000;
	}

	.filter-label {
		padding: 0.25rem 0;
	}

	.filter-list {
		display: flex;
		gap: 0.5rem;
		list-style-type: none;
		padding: 0;
		margin: 0;
	}
</style>
