<script>
	import * as filter from '~/filters';
	import { sort_helpers } from './chart-bar-utils';

	export let config;
	export let filterable = false;
	export let sort_type = 'popularity';

	$: field_name = config.field_name;
	$: unit = config.unit;
	$: data = config.data;
	$: sorter = sort_helpers[sort_type];

	const handle_filter = (value) => () => {
		filter.add({ field_name, value });
	};
</script>

<div class="bar-container">
	<div class="button-groups">
		<button
			class:active={sort_type === 'alphabet'}
			on:click={() => (sort_type = 'alphabet')}>Alphabetical</button
		>
		<button
			class:active={sort_type === 'popularity'}
			on:click={() => (sort_type = 'popularity')}>Popularity</button
		>
	</div>
	<ul class="bar-list-container">
		{#each Object.entries(data).sort(sorter) as [name, value], i (i)}
			<li class="bar-item" style="--js-value:{value.percent}%">
				<div class="bar-group">
					<div class="bar-label">
						<span class="bar-name">{name}</span>
						<span class="bar-divider">{' - '}</span>
						<span class="bar-value">
							{value.percent}%
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
</div>

<style>
	.bar-container {
		margin: 2rem 0;
	}

	.bar-list-container {
		padding: 0;
		list-style-type: none;
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
		background-color: var(--color-chart-bar-bg);
	}

	.bar-fg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform-origin: center left;
		transform: scaleX(var(--js-value, 0.1%));
		background-color: var(--color-chart-bar-fg);
		transition: transform 0.3s ease;
	}

	.bar-name {
		font-weight: 600;
	}

	.bar-filter {
		padding: 0.5rem;
	}

	.button-groups button {
		border: none;
		padding: 0.5rem 0.75rem;
		font-weight: 600;
		border-bottom: 1px solid transparent;
	}

	.button-groups button.active {
		background-color: var(--color-chart-bar-bg);
		color: var(--color-chart-bar-fg);
		border-bottom: 1px solid var(--color-chart-bar-fg);
	}
</style>
