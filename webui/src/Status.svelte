<script lang="ts">
	import { Progress } from '$lib/components/ui/progress';
	import * as Card from '$lib/components/ui/card';
	import * as HoverCard from '$lib/components/ui/hover-card';
</script>

<div class="m-3">
	<Card.Root class="w-[30%]">
		<Card.Header>
			<Card.Title>Capacity</Card.Title>
			<Card.Description>Currently 33% used</Card.Description>
		</Card.Header>
		<Card.Content>
			<HoverCard.Root>
				<HoverCard.Trigger>
					<Progress class="ml" value={33} />
				</HoverCard.Trigger>
				<HoverCard.Content>
					<p>Total capacity: 1GB</p>
					<p>Used: 0.33GB</p>
					<p>Remaining: 0.67GB</p>
				</HoverCard.Content>
			</HoverCard.Root>
		</Card.Content>
	</Card.Root>
</div>
