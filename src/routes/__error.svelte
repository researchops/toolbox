<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export function load({ error, status }) {
		return {
			props: {
				status,
				error
			}
		};
	}
</script>

<script>
	export let status;
</script>

<div class="container error-height">
	{#if status == 500}
		<h1>Error 500</h1>
		<p>Error loading data. Please try refreshing your browser.</p>

		<figure class="meme">
			<picture>
				<source srcset="./making-it.webp" type="image/webp" />
				<source srcset="./making-it.jpg" type="image/jpeg" />
				<img
					src="./making-it.jpg"
					alt="Two crafty people sitting on a front porch, with the caption 'Looks like we both bit off more than we can glue'"
				/>
			</picture>
			<figcaption>
				Looks like we both bit off more than we can glue
			</figcaption>
		</figure>
	{:else if status == 404}
		<h1>Error 404</h1>
		<p>
			We can’t find the page your looking for. Please try again or
			navigate <a href="/">back home</a>.
		</p>

		<figure class="meme">
			<picture>
				<source srcset="./more-power.webp" type="image/webp" />
				<source srcset="./more-power.jpg" type="image/jpeg" />
				<img
					src="./more-power.jpg"
					alt="two men in a workshop holding power tools, with the caption 'You know what we need? More power!'"
				/>
			</picture>
			<figcaption>You know what we need? More Power!</figcaption>
		</figure>
	{/if}
</div>

<style>
	.error-height {
		/* 10rem is roughly the height of the footer in most cases */
		min-height: calc(100vh - 10rem);
	}

	figure.meme {
		position: relative;
		text-align: center;
		margin: 0;
		padding: 0;
	}

	figure.meme picture img {
		max-width: 100%;
	}

	figure.meme figcaption {
		position: absolute;
		bottom: 2rem;
		width: 100%;
		font-family: impact, sans-serif;
		text-transform: uppercase;
		font-size: var(--font-size-lg);
		letter-spacing: 0.0425em;
		line-height: 1.1;
		padding: 0 1rem;
		color: white;
		text-shadow: -3px -3px 0 #000, 3px -3px 0 #000, -3px 3px 0 #000,
			3px 3px 0 #000;
	}
</style>
