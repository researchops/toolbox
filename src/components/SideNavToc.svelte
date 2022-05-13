<script>
	export let toc;
</script>

<ul class="toc-list">
	{#each toc as item, i (i)}
		<li class="toc-item" data-toc-level={item.level}>
			<a href={item.url}>{item.text}</a>
		</li>
	{/each}
</ul>

<style>
	.toc-list {
		margin: 1rem 0 1rem 2rem;
		padding: 0;
		list-style-type: none;
	}

	.toc-item {
		padding: 0.5rem 0;
	}

	.toc-item a {
		color: currentColor;
        font-size: 1rem;
		text-decoration: none;
	}
</style>
