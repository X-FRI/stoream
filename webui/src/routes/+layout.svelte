<script>
	import '../app.css';
	import Header from '../Header.svelte';
</script>

<div class="app">
	<Header />
	
	<main>
		<slot></slot>
	</main>
</div>