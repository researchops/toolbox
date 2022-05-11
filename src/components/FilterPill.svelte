<script>
	export let text = 'Missing value';
</script>

<button aria-label="Remove {text}" on:click class="pill-container">
	{text}
	<svg
		class="pill-remove"
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M11.25 6.75L6.75 11.25"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
		<path
			d="M6.75 6.75L11.25 11.25"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
			stroke-linejoin="round"
		/>
	</svg>
</button>

<style>
	.pill-container {
		cursor: pointer;
		padding: 0.25rem 0.5rem 0.25rem 0.75rem;
		display: inline-flex;
		align-items: center;
		gap: 0.5rem;
		border-radius: 999px;
		border: 2px solid var(--color-ocean-100);
		background-color: var(--color-ocean-40);
	}

	.pill-container:focus {
		color: var(--color-site-bg);
		background-color: var(--color-ocean-100);
	}

	.pill-remove {
		appearance: none;
		margin: 0;
		padding: 0;
		width: 1rem;
		height: 1rem;
		border: none;
		color: var(--color-ocean-100);
		background-color: transparent;
	}

	.pill-container:focus .pill-remove {
		color: var(--color-site-bg);
	}
</style>
