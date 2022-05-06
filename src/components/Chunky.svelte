<script>
	export let config;

	$: data = config.data;
</script>

<ul>
	{#each Object.entries(data) as [name, value], i (i)}
		<li class="bar-item">
			{JSON.stringify({ name, value })}
		</li>
	{/each}
</ul>
