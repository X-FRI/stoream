<script lang="ts">
	import * as Table from '$lib/components/ui/table';

	const directories = [
		{ dir_name: 'Daily', dir_size: '455MB' },
		{ dir_name: 'Documents', dir_size: '991MB' },
		{ dir_name: 'Computer Science', dir_size: '156MB' },
		{ dir_name: 'Medicine', dir_size: '44MB' },
		{ dir_name: 'Music', dir_size: '31MB' }
	];
</script>

<div>
	<Table.Root>
		<Table.Caption>Folders in Notes</Table.Caption>
		<Table.Header>
			<Table.Row>
				<Table.Head>NAME</Table.Head>
				<Table.Head class="text-right">SIZE</Table.Head>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each directories as { dir_name, dir_size }}
				<Table.Row>
					<Table.Cell>{dir_name}</Table.Cell>
					<Table.Cell class="text-right">{dir_size}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
</div>
