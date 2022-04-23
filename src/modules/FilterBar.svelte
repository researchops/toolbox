<script>
	import { session } from '$app/stores';
</script>

<div class="container">
	filter: {JSON.stringify($session.filters)}
	<button on:click={() => ($session.filters = [])}>Clear</button>
</div>
