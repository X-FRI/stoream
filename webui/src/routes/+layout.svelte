<script>
	import Header from './Header.svelte';
	import '../app.css';
</script>

<div class="app">
	<Header></Header>

	<main>
		<slot></slot>
	</main>
</div>