<script>
	import FilterBar from '~/components/FilterBar.svelte';
	import Nav from '~/components/Nav.svelte';
	import Footer from '~/components/Footer.svelte';
	import SideNav from '~/components/SideNav.svelte';
	import 'modern-normalize/modern-normalize.css';
	import '@fontsource/raleway/700.css';
	import '@fontsource/source-sans-pro/400.css';
	import '@fontsource/source-sans-pro/600.css';
	import '~/global.css';
</script>

<Nav />
<div class="layout container">
	<div class="layout-sidenav">
		<SideNav />
	</div>
	<div class="layout-content">
		<slot />
	</div>
</div>

<FilterBar />
<Footer />

<style>
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
