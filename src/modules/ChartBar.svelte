<script>
	import { session } from '$app/stores';

	export let config;
	export let filterable = false;

	$: field_name = config.field_name;
	$: unit = config.unit;
	$: data = config.data;

	const filter = (name) => () => {
		$session.filters = [[`${field_name} == "${name}"`]];
	};
</script>

<ul class="bar-container">
	{#each Object.entries(data) as [name, value], i (i)}
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
				<button class="bar-filter" on:click={filter(name)}
					>Filter</button
				>
			{/if}
		</li>
	{/each}
</ul>

<style>
	.bar-container {
		margin: 0;
		padding: 0;
		margin-bottom: 1rem;
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
		background-color: var(--color-chart-bar-bg, #ececec);
	}

	.bar-fg {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		transform-origin: center left;
		transform: scaleX(var(--js-value, 0.1%));
		background-color: var(--color-chart-bar-fg, #ccc);
		transition: transform .3s ease;
	}

	.bar-name {
		font-weight: 600;
	}

	.bar-filter {
		padding: 0.5rem;
	}
</style>
