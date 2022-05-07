<script>
	import FilterBar from '~/components/FilterBar.svelte';
	import SideNav from '~/components/SideNav.svelte';
	import 'modern-normalize/modern-normalize.css';
	import '~/global.css';
</script>

<div class="layout container">
	<div class="layout-sidenav">
		<SideNav />
	</div>
	<div class="layout-content">
		<slot />
	</div>
</div>

<FilterBar />

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
			width: 20%;
			align-self: flex-start;
			top: 0;
			position: sticky;
		}
	}
</style>
