<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import { Button } from '$lib/components/ui/button';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import Icon from '@iconify/svelte';

	const files = [
		{ file_name: 'demo1.pdf', file_type: 'pdf' },
		{ file_name: 'demo2.pdf', file_type: 'pdf' },
		{ file_name: 'demo3.pdf', file_type: 'pdf' },
		{ file_name: 'demo4.pdf', file_type: 'pdf' },
		{ file_name: 'demo5.pdf', file_type: 'pdf' }
	];

	let showBookmarks = false;
	let showFullURLs = true;

	let value = 'pedro';
</script>

<div class="w-full h-full">
	<div class="flex h-[90%]">
		{#each files as { file_name, file_type }}
			<div class="m-3">
				<ContextMenu.Root>
					<ContextMenu.Trigger>
						<Button class="flex h-[6rem] w-[5rem] flex-col">
							<div class="mb-1 h-full w-full">
								<Icon icon="ic:baseline-picture-as-pdf" width="100%" />
							</div>
							<p class="mt-1">{file_name}</p>
						</Button>
					</ContextMenu.Trigger>
					<ContextMenu.Content>
						<ContextMenu.Item>Profile</ContextMenu.Item>
						<ContextMenu.Item>Billing</ContextMenu.Item>
						<ContextMenu.Item>Team</ContextMenu.Item>
						<ContextMenu.Item>Subscription</ContextMenu.Item>
					</ContextMenu.Content>
				</ContextMenu.Root>
			</div>
		{/each}
	</div>

	<footer class="sticky bottom-0">
		<Pagination.Root count={100} perPage={10} let:pages let:currentPage>
			<Pagination.Content>
				<Pagination.Item>
					<Pagination.PrevButton />
				</Pagination.Item>
				{#each pages as page (page.key)}
					{#if page.type === 'ellipsis'}
						<Pagination.Item>
							<Pagination.Ellipsis />
						</Pagination.Item>
					{:else}
						<Pagination.Item isVisible={currentPage == page.value}>
							<Pagination.Link {page} isActive={currentPage == page.value}>
								{page.value}
							</Pagination.Link>
						</Pagination.Item>
					{/if}
				{/each}
				<Pagination.Item>
					<Pagination.NextButton />
				</Pagination.Item>
			</Pagination.Content>
		</Pagination.Root>
	</footer>
</div>
