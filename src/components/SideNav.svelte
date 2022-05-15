<script>
	import { page } from '$app/stores';
	import SideNavToc from './SideNavToc.svelte';
	import { nav_config } from '~/nav_config';

	export let current_toc;

	$: current_page = $page.url.pathname;
</script>

<nav class="nav">
	<ul class="nav-list">
		{#each nav_config as { id, path, label, prefetch = true } (id)}
			{@const active = current_page === path}
			<li class="nav-item">
				<a class:active sveltekit:prefetch={prefetch} href={path}
					>{label}</a
				>
				{#if active}
					<SideNavToc toc={current_toc} />
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<style>
	.nav {
		max-height: 100vh;
		padding-bottom: 2rem;
		overflow-y: scroll;
	}

	.nav-list {
		margin: 0;
		padding: 0;
		list-style-type: none;
		margin-top: 1.25rem;
	}

	.nav-item {
		display: block;
		margin: 0.5rem 0;
	}

	.nav-item a {
		display: block;
		/* color: currentColor; */
		color: var(--color-midnight-80);
		padding: 0.75rem 1rem;
		text-decoration: none;
		font-size: 1.125rem;
		line-height: initial;
		border-left: 2px solid transparent;
	}

	.nav-item a:hover {
		color: currentColor;
	}

	.nav-item a.active {
		color: var(--color-nav-highlight-fg);
		font-weight: 600;
		border-color: var(--color-nav-highlight-fg);
		background-color: var(--color-nav-highlight-bg);
	}
</style>
