<script>
	import { page } from '$app/stores';
	import SideNavToc from './SideNavToc.svelte';

	export let current_toc;

	const navs = [
		{ id: '0', path: '/', label: 'Welcome' },
		{ id: '1', path: '/participants', label: 'Participant info' },
		{ id: '2', path: '/industry-info', label: 'Industry info' },
		{
			id: '3',
			path: '/tools-operations-planning',
			label: 'Operations and planning'
		},
		{
			id: '4',
			path: '/participant-management',
			label: 'Recruiting & Participant Management'
		},
		{
			id: '5',
			path: '/design-collaboration',
			label: 'Design & Collaboration'
		},
		{
			id: '6',
			path: '/analytics',
			label: 'Analytics'
		},
		{
			id: '7',
			path: '/design-research',
			label: 'Design Research'
		},
		{
			id: '8',
			path: '/user-research',
			label: 'User Research'
		},
		{
			id: '9',
			path: '/synthesizing-analyzing',
			label: 'Synthesizing & analyzing'
		},
		{
			id: '10',
			path: '/reporting-sharing',
			label: 'Reporting & sharing'
		}
	];

	$: current_page = $page.url.pathname;
</script>

<nav class="nav">
	<ul class="nav-list">
		{#each navs as { id, path, label, prefetch = true } (id)}
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
	}

	.nav-item a {
		display: block;
		color: currentColor;
		padding: 0.75rem 1rem;
		text-decoration: none;
		font-size: 1.125rem;
		border-left: 2px solid transparent;
	}

	.nav-item a.active {
		color: var(--color-nav-highlight-fg);
		font-weight: 600;
		border-color: var(--color-nav-highlight-fg);
		background-color: var(--color-nav-highlight-bg);
	}
</style>
