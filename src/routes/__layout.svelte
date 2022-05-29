<script>
	import FilterBar from '~/components/FilterBar.svelte';
	import Nav from '~/components/Nav.svelte';
	import Footer from '~/components/Footer.svelte';
	import 'modern-normalize/modern-normalize.css';
	import '@fontsource/raleway/variable.css';
	import '@fontsource/source-sans-pro/400.css';
	import '@fontsource/source-sans-pro/400-italic.css';
	import '@fontsource/source-sans-pro/600.css';
	import '~/global.css';
</script>

<Nav />
<slot />

<FilterBar />
<Footer />
