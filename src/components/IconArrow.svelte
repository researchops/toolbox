<script>
	export let direction = 'right';

	$: rotate = ['right', 'bottom', 'left', 'top'].indexOf(direction) * 90;
</script>

<svg
	width="24"
	height="24"
	style="transform: rotate({rotate}deg);"
	viewBox="0 0 24 24"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		d="M9 18.4941L15 12.4941L9 6.49414"
		stroke="currentColor"
		stroke-width="2"
		stroke-linecap="round"
		stroke-linejoin="round"
	/>
</svg>
