<script>
	import { Icon } from "lucide-svelte";

	export let name;
	$: type = name.slice(name.lastIndexOf('.') + 1);
</script>

<div class="flex">
    <Icon icon="mdi:file" />
    <p> {name} </p>
</div>
