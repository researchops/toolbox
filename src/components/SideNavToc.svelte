<script>
	export let toc;
</script>

{#if toc.length > 0}
	<ul class="toc-list">
		{#each toc as item, i (i)}
			{#if item.level < 1}
				<li class="toc-item">
					<a href={item.url}>{item.text}</a>
				</li>
			{/if}
		{/each}
	</ul>
{/if}

<style>
	.toc-list {
		margin: 0.5rem 0 0 1rem;
		padding: 0 0 0 1rem;
		border-left: 2px solid var(--color-midnight-60);
		list-style-type: none;
	}

	.toc-item {
		padding: .45rem 0;
		line-height: 1.3;
	}

	.toc-item a {
		color: var(--color-midnight-80);
		font-size: 1rem;
		text-decoration: none;
	}

	.toc-item a:hover {
		color: currentColor;
	}
</style>
