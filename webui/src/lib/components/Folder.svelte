<script>
	import { Icon } from 'lucide-svelte';
import File from './File.svelte';

	export let expanded = false;
	export let name;
	export let files;

	function toggle() {
		expanded = !expanded;
	}
</script>

<div class:expanded class="flex bg-black" on:click={toggle}>
    <Icon icon="material-symbols:folder" />
    <p>{name}</p>
</div>

{#if expanded}
	<ul>
		{#each files as file}
			<li>
				{#if file.type === 'folder'}
					<svelte:self {...file} />
				{:else}
					<File {...file} />
				{/if}
			</li>
		{/each}
	</ul>
{/if}
