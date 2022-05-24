<script>
	import IconInfo from './IconInfo.svelte';
	import IconDownload from './IconDownload.svelte';

	const icon_map = {
		info: IconInfo,
		download: IconDownload
	};

	export let type = 'info';

	$: Icon = icon_map[type];
</script>

<section class="note-container">
	<div class="note-icon">
		<svelte:component this={Icon} />
	</div>
	<div>
		<slot />
	</div>
</section>

<style>
	.note-container {
		padding: 1.5rem 2rem;
		border-radius: 4px;
		background-color: var(--color-theme-bg);
	}

	.note-container :global(p) {
		padding: 0;
		margin: 0;
	}

	.note-icon {
		flex: 1;
		padding: 0.5rem 0;
		color: var(--color-theme-fg);
	}

	@media (min-width: 600px) {
		.note-container {
			display: flex;
			align-items: center;
			gap: 2.5rem;
			padding: 2rem 2.5rem;
		}
	}
</style>
