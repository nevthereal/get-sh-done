<script lang="ts">
	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
	import * as Card from '$lib/components/ui/card';
	import { Info } from '@lucide/svelte';
	import { Button } from './ui/button';
	import { useConvexClient } from 'convex-svelte';
	import { api } from '$convex/_generated/api';
	import { type Doc } from '$convex/_generated/dataModel';

	let { step, index }: { step: Doc<'step'>; index: number } = $props();

	const client = useConvexClient();
</script>

<Card.Root class="flex flex-col justify-between">
	<div class="flex flex-col gap-2">
		<Card.Header>
			<Card.Title>Small Step N° {index + 1}</Card.Title>
		</Card.Header>
		<Card.Content class="flex items-center justify-between gap-2">
			<span>
				{step.title}
				{#if step.isHabit}
					<span class="text-primary"> (habit) </span>
				{/if}
			</span>
			<HoverCard.Root>
				<HoverCard.Trigger>
					<Info size={20} />
				</HoverCard.Trigger>
				<HoverCard.Content
					><p>
						{step.description}
					</p>
					{#if step.isHabit && step.howOften}
						<p class="text-muted-foreground">
							Should be repeated {step.howOften}
						</p>
					{/if}
				</HoverCard.Content>
			</HoverCard.Root>
		</Card.Content>
	</div>
	<Card.Footer>
		<Button
			onclick={() => client.mutation(api.functions.deleteStep, { stepId: step._id })}
			class="w-full"
			variant="destructive">Reject</Button
		>
	</Card.Footer>
</Card.Root>
