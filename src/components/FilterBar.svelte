<script>
	import { fly } from 'svelte/transition';
	import { session } from '$app/stores';
	import * as filter from '~/filters';
	import FilterPill from './FilterPill.svelte';
	import { state, participant_count, mode } from '~/ui.store';

	const handle_remove_filter = (value) => () => filter.remove(value);
	const handle_clear_filter = () => filter.clear();

	const handle_mode = (e) => {
		$mode = e.target.checked ? 'filtered' : 'full';
	};
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
				<li>
					<label
						><input
							on:change={handle_mode}
							type="checkbox"
							checked={$mode === 'filtered'}
						/>Toggle filters</label
					>
				</li>
			{/each}
		</ul>
		{#if $state === 'loading'}
			<span>loading...</span>
		{/if}
		<span class="filter-info-match"
			>{$participant_count} participants match</span
		>
		<button class="filter-btn-clear" on:click={handle_clear_filter}
			>Clear all filters</button
		>
	</div>
{/if}

<style>
	.filter-container {
		position: sticky;
		display: flex;
		gap: 0.5rem;
		align-items: center;
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
		flex: 1;
		display: inline-flex;
		gap: 0.5rem;
		list-style-type: none;
		padding: 0;
		margin: 0;
	}

	.filter-info-match {
		font-size: 1.25rem;
		font-style: italic;
		color: var(--color-midnight-80);
	}

	.filter-btn-clear {
		appearance: none;
		border: none;
		background-color: transparent;
		text-decoration: underline;
		font-size: 1.25rem;
		color: var(--color-midnight-100);
	}
</style>
