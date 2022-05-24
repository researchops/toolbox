<script>
	import PageBottomNav from '~/components/PageBottomNav.svelte';
	import SideNav from '~/components/SideNav.svelte';
	import SEO from '~/components/SEO.svelte';

	export let theme = 'plasma';
	export let title = '⚠️ Missing Title';
	export let _toc;
</script>

<SEO page_title={title} />

<div class="page-container {theme} layout container">
	<div class="layout-sidenav">
		<SideNav current_toc={_toc} />
	</div>
	<div class="layout-content">
		<h1>{title}</h1>
		<slot />
		<hr />
		<PageBottomNav />
	</div>
</div>

<style>
	.page-container:global(.plasma) {
		--color-chart-bar-fg: var(--color-plasma-100);
		--color-chart-bar-bg: var(--color-plasma-40);
	}

	.page-container:global(.ocean) {
		--color-chart-bar-fg: var(--color-ocean-100);
		--color-chart-bar-bg: var(--color-ocean-40);
	}

	.page-container:global(.rise) {
		--color-chart-bar-fg: var(--color-rise-160);
		--color-chart-bar-bg: var(--color-rise-40);
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	@media (min-width: 400px) {
		.layout {
			display: flex;
			gap: 2rem;
		}

		.layout-content {
			flex: 1;
		}

		.layout-sidenav {
			width: 25%;
			align-self: flex-start;
			top: 0;
			position: sticky;
		}
	}
</style>
