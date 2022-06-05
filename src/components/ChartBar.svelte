<script>
	import * as filter from '~/filters';
	import { sort_helpers } from './chart-bar-utils';
	import { session } from '$app/stores';
	import { mode } from '~/ui.store';

	export let config;
	export let filterable = false;
	export let sort_type = 'popularity';
	export let limit = 10;
	export let unit = 'question respondents';

	let show_all = false;

	$: field_name = config.field_name;
	$: data = config.data;
	$: completion_percentage = config.completion_percentage;
	$: sorter = sort_helpers[sort_type];
	$: filter_applied = $session.filters?.length > 0 || false;
	$: display_data = Object.entries(data)
		.sort(sorter($mode))
		.filter((_, i) => (show_all ? true : i < limit));

	const handle_filter = (value) => () => {
		filter.add({ field_name, value });
	};
</script>

<div class="bar-container">
	<div class="button-groups">
		<button
			class:active={sort_type === 'alphabet'}
			aria-selected={sort_type === 'alphabet'}
			on:click={() => (sort_type = 'alphabet')}>Alphabetical</button
		>
		<button
			class:active={sort_type === 'popularity'}
			aria-selected={sort_type === 'popularity'}
			on:click={() => (sort_type = 'popularity')}>Popularity</button
		>
	</div>

	<ul class="bar-list-container">
		{#each display_data as [name, value], i (i)}
			{@const percent = value[$mode].percent}
			<li class="bar-item" style="--js-value:{percent / 100}">
				<div class="bar-group">
					<div class="bar-label">
						<span class="bar-name">{name}</span>
						<span class="bar-divider">{' - '}</span>
						<span class="bar-value">
							{percent}%
							{#if i === 0}
								of {unit}
							{/if}
						</span>
					</div>
					<div class="bar-bg">
						<div class="bar-fg" />
					</div>
				</div>
				{#if filterable}
					<button class="bar-filter" on:click={handle_filter(name)}
						>Filter</button
					>
				{/if}
			</li>
		{/each}
	</ul>

	{#if display_data.length >= limit}
		<label class="input-show-all">
			<input type="checkbox" bind:checked={show_all} />
			{show_all ? 'Hide' : 'Show'} less popular answers
		</label>
	{/if}
	{#if !filter_applied}
		<small
			>{completion_percentage}% of participants answered this question.</small
		>
	{/if}
</div>

<style>
	.bar-container {
		margin: 2rem 0;
	}

	.bar-list-container {
		padding: 0;
		list-style-type: none;
		/* font-size: 0.875rem; */
		font-size: var(--font-size-sm);
	}

	.bar-item {
		display: flex;
		gap: 1rem;
		align-items: flex-start;
		margin-bottom: 1rem;
	}

	.bar-group {
		flex: 1;
	}

	.bar-label {
		margin-bottom: 0.25rem;
	}

	.bar-bg {
		position: relative;
		width: 100%;
		height: 1.125rem;
		background-color: var(--color-theme-bg);
	}

	.bar-fg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform-origin: center left;
		transform: scaleX(var(--js-value, 0.1));
		background-color: var(--color-theme-fg);
		transition: transform 0.3s ease;
	}

	.bar-name {
		font-weight: 600;
	}

	.bar-filter {
		padding: 0.5rem;
	}

	.button-groups {
		display: flex;
		gap: 0.25rem;
		align-items: center;
		margin-bottom: 1.5rem;
	}

	.input-show-all {
		display: flex;
		align-items: center;
		gap: 0.25rem;
		color: var(--color-nav-highlight-fg);
		font-weight: 600;
		text-decoration: underline;
	}

	.input-show-all input[type='checkbox'] {
		appearance: none;
		opacity: 0;
		position: absolute;
	}

	.button-groups button {
		border: none;
		padding: 0.5rem 0.75rem;
		font-weight: 600;
		border-bottom: 1px solid transparent;
	}

	.button-groups button.active {
		background-color: var(--color-theme-bg);
		color: var(--color-theme-fg);
		border-bottom: 1px solid var(--color-theme-fg);
	}
</style>
