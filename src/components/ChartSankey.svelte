<script>
	import { afterUpdate } from 'svelte';
	import { sankey } from './chart-sankey-d3';
	import { mode } from '~/ui.store';

	export let config;
	let width;

	/** @type HTMLElement */
	let container;
	$: data = config.data[$mode];

	const nodeLabel = ({ id }) => id.substring(0, id.length - 2)

	afterUpdate(() => {
		const svg = container.querySelector('svg');
		if (svg) {
			container.removeChild(svg);
		}
		if (data.length <= 0) return;
		sankey(
			{
				links: data
			},
			{
				nodeGroup: (d) => d.id.split(/\W/)[0], // take first word for color
				nodeAlign: 'right',
				nodeLabel,
				linkColor: 'source-target',
				width,
				height: Math.max(500, data.length * 7),
				rootID: '#svg-root',
				colors: ['#2D68C8', '#6545A9', '#F5C944', '#EC5496']
			}
		);
	});
</script>

<div bind:this={container} bind:clientWidth={width} id="svg-root" />

<small>Data point with 1 connection is not included.</small>
