<script>
	import { page } from '$app/stores';

	const navs = [
		{ id: '0', path: '/', label: 'Welcome' },
		{ id: '1', path: '/participants', label: 'Participant info' },
		{ id: '2', path: '/industry-info', label: 'Industry Info' }
	];

	$: current_page = $page.url.pathname;
</script>

<nav>
	<ul class="nav-list">
		{#each navs as { id, path, label, prefetch = true } (id)}
			<li class="nav-item">
				<a
					class:active={current_page === path}
					sveltekit:prefetch={prefetch}
					href={path}>{label}</a
				>
			</li>
		{/each}
	</ul>
</nav>

<style>
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
		padding: 0.5rem 1rem 0.75rem;
		text-decoration: none;
		font-size: 1.125rem;
		border-left: 2px solid transparent;
	}

	.nav-item a.active {
		border-color: var(--color-chart-bar-fg);
		background-color: var(--color-chart-bar-bg);
	}
</style>
