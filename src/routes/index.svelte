<script>
	import group_by from 'lodash-es/groupBy';
	export let data;

	const grouped = group_by(data, ({ expertise }) => expertise);
</script>

<h2>Participant info</h2>
<h3>Discipline</h3>
<ul>
	{#each Object.entries(grouped) as [name, value], i (i)}
		<li>
			{name}: {value.length}
		</li>
	{/each}
</ul>
