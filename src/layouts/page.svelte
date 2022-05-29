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
	
	<div class="logo-wrap">
		<Nav />
	</div>

	<div class="site-nav-wrap">
		<SideNav current_toc={_toc} />
	</div>

	<div id="main-content" class="layout-content-wrap">
		<h1>{title}</h1>
		<slot />
		<hr />
		<PageBottomNav />
	</div>

	<div class="footer-wrap">
		<Footer />
	</div>
</div>

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

	@media (min-width: 420px) {
		.layout {
			display: grid;
			grid-template-columns: 270px 1fr;
			grid-template-areas:
				'logo main'
				'nav main'
				'footer footer';
		}

		.logo-wrap {
			grid-area: logo;
			height: 50px;
			margin-left: 1rem;
		}

		.site-nav-wrap {
			grid-area: nav;
			height: calc(100vh - 50px);
		}

		.layout-content-wrap {
			grid-area: main;
			max-width: 66rem;
			margin: auto;
		}

		.footer-wrap {
			grid-area: footer;
		}
	}
</style>
