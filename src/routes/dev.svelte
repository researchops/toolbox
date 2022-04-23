<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export async function load({ fetch, session }) {
		const res = await fetch('/api', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				filters: session.filters || [],
				chart_ids: ['expertise', 'company']
			})
		});

		const data = await res.json();

		return {
			status: res.status,
			props: {
				data
			}
		};
	}
</script>

<script>
	import ChartBar from '~/modules/ChartBar.svelte';

	export let data;
</script>

<main class="page-container">
	{#each data as config (config.field_name)}
		<h1>{config.field_name}</h1>
		<ChartBar {config} filterable />
		<hr />
	{/each}
</main>

<style>
	.page-container {
		--color-chart-bar-fg: var(--color-plasma-100);
		--color-chart-bar-bg: var(--color-plasma-40);
	}
</style>
