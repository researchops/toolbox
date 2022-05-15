<script>
	import { afterUpdate } from 'svelte';
	import { sankey } from './chart-sankey-d3';

	export let config;
	let width;
	$: data = config.data;

	afterUpdate(() => {
		sankey(
			{
				links: data
			},
			{
				nodeGroup: (d) => d.id.split(/\W/)[0], // take first word for color
				nodeAlign: 'right',
				linkColor: 'source-target',
				width,
				height: Math.max(500, data.length * 7),
				rootID: '#svg-root'
			}
		);
	});
</script>

<div bind:clientWidth={width} id="svg-root" />

<small>Data point with 1 connection is not included.</small>
