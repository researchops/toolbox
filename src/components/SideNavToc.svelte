<script>
	export let toc;
</script>

{#if toc.length > 0}
	<ul class="toc-list">
		{#each toc as item, i (i)}
			<li class="toc-item" data-toc-level={item.level}>
				<a href={item.url}>{item.text}</a>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.toc-list {
		margin: .5rem 0 0 2rem;
		padding: 0;
		list-style-type: none;
	}

	.toc-item {
		padding: 1rem 0;
	}

	.toc-item a {
		color: var(--color-midnight-80);
		font-size: 1rem;
		line-height: initial;
		text-decoration: none;
	}

	.toc-item a:hover {
		color: currentColor;
	}
</style>
