<script lang="ts">
	import * as Pagination from '$lib/components/ui/pagination/index.js';
	import * as HoverCard from '$lib/components/ui/hover-card';
	import * as ContextMenu from '$lib/components/ui/context-menu/index.js';
	import Icon from '@iconify/svelte';
	import { Button } from '$lib/components/ui/button';

	const files = [
		{
			file_name: 'Concepts and Semantics of Programming Language',
			file_type: 'pdf',
			file_size: '1.6MB'
		},
		{ file_name: '社区居民急救手册', file_type: 'doc', file_size: '1.7MB' },
		{ file_name: 'tokens', file_type: 'txt', file_size: '2.3MB' },
		{ file_name: 'README', file_type: '', file_size: '1.5MB' },
		{ file_name: 'Childs', file_type: 'mp3', file_size: '3.2MB' }
	];

	let showBookmarks = false;
	let showFullURLs = true;

	let value = 'pedro';
</script>

<div class="h-full w-full">
	<div class="flex h-[90%] items-center justify-center">
		{#each files as { file_name, file_type, file_size }}
			<div class="m-3">
				<ContextMenu.Root>
					<ContextMenu.Trigger>
						<HoverCard.Root>
							<HoverCard.Trigger>
								<Button class="flex h-auto max-h-[6rem] w-auto max-w-[5rem] flex-col">
									{#if file_type == 'pdf'}
										<div class="mb-1 h-full w-full">
											<Icon icon="hugeicons:pdf-02" width="100%" color="red" />
										</div>
									{:else if file_type == 'doc'}
										<div class="mb-1 h-full w-full">
											<Icon icon="hugeicons:doc-02" width="100%" color="#9999ff" />
										</div>
									{:else if file_type == 'txt'}
										<div class="mb-1 h-full w-full">
											<Icon icon="hugeicons:txt-02" width="100%" />
										</div>
									{:else if file_type == 'mp3'}
										<div class="mb-1 h-full w-full">
											<Icon icon="hugeicons:file-music" width="100%" color="#33cc66" />
										</div>
									{:else}
										<div class="mb-1 h-full w-full">
											<Icon icon="hugeicons:file-02" width="100%" />
										</div>
									{/if}
									<p class="mt-1 truncate max-w-20 pl-2 pr-2">{file_name}</p>
								</Button>
							</HoverCard.Trigger>
							<HoverCard.Content>
								<p>{file_name + '.' + file_type}</p>
								<hr class="mb-1 mt-1" />
								<ul class="list-disc mx-3">
									<li>File size: {file_size}</li>
									<li>Last time: 2022/09/31</li>
								</ul>
							</HoverCard.Content>
						</HoverCard.Root>
					</ContextMenu.Trigger>
					<ContextMenu.Content>
						<ContextMenu.Item>Delete</ContextMenu.Item>
						<ContextMenu.Item>Copy</ContextMenu.Item>
						<ContextMenu.Item>Move</ContextMenu.Item>
						<ContextMenu.Item>Detail</ContextMenu.Item>
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
