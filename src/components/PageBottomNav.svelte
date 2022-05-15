<script>
	import { nav_config } from '~/nav_config';
	import { page } from '$app/stores';
	import IconArrow from './IconArrow.svelte';

	$: [prev, next] = get_nav(nav_config, $page.url.pathname);

	function get_nav(nav_config, pathname) {
		const current_idx = nav_config.findIndex(
			({ path }) => path === pathname
		);
		if (current_idx < 0) {
			return [null, null];
		}
		const prev = nav_config[current_idx - 1];
		const next = nav_config[current_idx + 1];
		return [prev, next];
	}
</script>

<div class="page-nav">
	{#if prev}
		<a sveltekit:prefetch href={prev.path}><IconArrow direction="left" /> {prev.label}</a>
	{/if}
	{#if next}
		<a sveltekit:prefetch href={next.path}>{next.label} <IconArrow /></a>
	{/if}
</div>

<style>
	.page-nav {
		display: flex;
		justify-content: space-between;
		margin: 2rem 0;
	}

	.page-nav a {
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		padding: 0.5rem 0.75rem;
		border-radius: 4px;
		text-decoration: none;
		color: var(--color-nav-highlight-fg);
		border: 2px solid var(--color-nav-highlight-fg);
	}

	.page-nav a:hover {
		background-color: var(--color-nav-highlight-bg);
	}
</style>
