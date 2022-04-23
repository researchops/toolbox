<script>
	export let theme = 'plasma';
</script>

<main class="page-container {theme}">
	<slot />
</main>

<style>
	.page-container:global(.plasma) {
		--color-chart-bar-fg: var(--color-plasma-100);
		--color-chart-bar-bg: var(--color-plasma-40);
	}
</style>
