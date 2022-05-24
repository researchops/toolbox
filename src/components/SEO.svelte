<script>
    export let page_title = null
	let root = import.meta.env.CF_PAGES_URL || 'http://localhost:3000';
    let site_title = 'Re+Ops Tools Census'

    $: title = [page_title, site_title].filter(Boolean).join(' | ')
</script>

<svelte:head>
	<title>{title}</title>
	<meta
		name="description"
		content="A community-based project focused on creating and maintaining a resource for people to find out not only what user experience research tools are being used, but also in which industry, by what size of teams, and where in the world."
	/>
	<meta property="og:title" content="Re+Ops Tools Census" />
	<meta property="og:type" content="website" />
	<meta
		property="og:description"
		content="A community-based project focused on creating and maintaining a resource for people to find out not only what user experience research tools are being used, but also in which industry, by what size of teams, and where in the world."
	/>
	<meta property="og:image" content="{root}/socialimage.png" />
	<meta property="og:url" content="https://toolbox.researchops.community" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta property="og:site_name" content="Re+Ops Tools Census" />
	<meta
		name="twitter:image:alt"
		content="A medium sized toolbox with a research operations branded sticker"
	/>
</svelte:head>
