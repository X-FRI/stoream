<script lang="ts">
	import { page } from '$app/stores';
	import * as Menubar from '$lib/components/ui/menubar/index.js';
</script>

<header>
	<Menubar.Root>
		<Menubar.Menu aria-current={$page.url.pathname === '/' ? 'page' : undefined}>
			<Menubar.Trigger><a href="/">Home</a></Menubar.Trigger>
			<a href="/about"><Menubar.Trigger>About</Menubar.Trigger></a>
			<a href="/sverdle"><Menubar.Trigger>Home</Menubar.Trigger></a>
		</Menubar.Menu>
	</Menubar.Root>
</header>
