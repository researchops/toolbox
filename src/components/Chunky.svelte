<script>
	import { sort_helpers } from './chart-bar-utils';
	import { mode } from '~/ui.store';

	export let config;
	export let limit = 12;

	$: data = config.data;
</script>

<ul class="chunky-container">
	{#each Object.entries(data)
		.sort(sort_helpers.popularity)
		.filter((_, i) => i < limit) as [name, value], i (i)}
		<li class="chunky-item">
			<div class="chunky-text">{value[$mode].percent}%</div>
			<div>{name}</div>
		</li>
	{/each}
</ul>

<style>
	.chunky-container {
		display: grid;
		gap: 2rem 1rem;
		font-size: 0.875rem;
		grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
		list-style-type: none;
		padding: 0;
		margin: 2rem 0;
	}

	.chunky-text {
		font-size: 2rem;
		font-weight: 600;
		margin-bottom: 0.25rem;
	}
</style>
