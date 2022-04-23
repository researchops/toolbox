<script>
	import { session } from '$app/stores';
</script>

<div class="container filter-container">
	filter: {JSON.stringify($session.filters)}
	<button on:click={() => ($session.filters = [])}>Clear</button>
</div>

<style>
	.filter-container {
		position: sticky;
		top: 0;
		padding: 1rem 2rem;
		border-bottom: 1px solid #ccc;
		background-color: var(--color-site-bg);
		z-index: 1000;
	}
</style>