<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable';
	import Directories from '../Directories.svelte';
	import Files from '../Files.svelte';
	import Status from '../Status.svelte';

	export const layout: number[] | undefined = undefined;
	
	const onLayoutChange = (sizes: number[]) => {
		document.cookie = `Home:layout=${JSON.stringify(sizes)}`;
	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<Resizable.PaneGroup direction="horizontal" class="w-full h-full rounded-lg border absolute" {onLayoutChange}>
	<Resizable.Pane defaultSize={20}>
		<Directories />
	</Resizable.Pane>
	<Resizable.Handle />
	<Resizable.Pane defaultSize={80}>
		<Resizable.PaneGroup direction="vertical">
			<Resizable.Pane defaultSize={70}>
				<Files />
			</Resizable.Pane>
			<Resizable.Handle />
			<Resizable.Pane defaultSize={30}>
				<Status />
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</Resizable.Pane>
</Resizable.PaneGroup>
