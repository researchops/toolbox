<script>
	import PageBottomNav from '~/components/PageBottomNav.svelte';
	import SideNav from '~/components/SideNav.svelte';
	import Nav from '~/components/Nav.svelte';
	import Footer from '~/components/Footer.svelte';
	import SEO from '~/components/SEO.svelte';

	export let theme = 'plasma';
	export let title = '⚠️ Missing Title';
	export let _toc;
</script>

<SEO page_title={title} />

<div class="page-container {theme} layout">

	<aside>

		<Nav /> 

		<SideNav current_toc={_toc} />

	</aside>

	<main id="main" class="layout-content-wrap">
		<h1>{title}</h1>
		<slot />
		<hr />
		<PageBottomNav />
	</main>

</div>

<Footer />


<style>
	.page-container:global(.plasma) {
		--color-theme-fg: var(--color-plasma-100);
		--color-theme-bg: var(--color-plasma-40);
	}

	.page-container:global(.ocean) {
		--color-theme-fg: var(--color-ocean-100);
		--color-theme-bg: var(--color-ocean-40);
	}

	.page-container:global(.rise) {
		--color-theme-fg: var(--color-rise-160);
		--color-theme-bg: var(--color-rise-40);
	}

	:global(html) {
		scroll-behavior: smooth;
	}

	main {
		padding: 0 1rem;
	}

	@media (min-width: 420px) {
		.layout {
			display: grid;
			grid-template-columns: 270px 1fr;
		}

		aside {
			position: sticky;
			height: 100vh;
			top: 0;
		}

		.site-nav-wrap {
			height: calc(100vh - 50px);
		}

		.layout-content-wrap {
			max-width: 48rem;
			margin: auto;
		}
	}
</style>
