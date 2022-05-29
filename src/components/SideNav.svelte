<script>
	import { page } from '$app/stores';
	import SideNavToc from './SideNavToc.svelte';
	import { nav_config } from '~/nav_config';

	export let current_toc;

	$: current_page = $page.url.pathname;
</script>

<nav class="nav">
	<a class="skip-link" href="#main-content">Skip to main content</a>

	<ul class="nav-list">
		{#each nav_config as { id, path, label, prefetch = true } (id)}
			{@const active = current_page === path}
			<li class="nav-item">
				<a
					class:active
					sveltekit:prefetch={prefetch}
					href={path}
					aria-current={active ? 'page' : 'false'}>{label}</a
				>
				{#if active}
					<SideNavToc toc={current_toc} />
				{/if}
			</li>
		{/each}
	</ul>
</nav>

<style>
	.skip-link {
		background-color: var(--color-theme-bg);
		color: var(--color-theme-fg);
		top: 0;
		left: 0;
		padding: 0.5rem;
		position: absolute;
		transform: translateY(-100%);
		transition: transform 0.3s, opacity 0.3s;
		opacity: 0;
	}

	.skip-link:focus {
		transform: translateY(0%);
		opacity: 1;
	}

	.nav {
		max-height: 90vh;
		overflow-y: scroll;
	}

	.nav-list {
		margin: 0;
		padding: 0;
		list-style-type: none;
		margin-bottom: 4rem;
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
