<script lang="ts">
	import * as HoverCard from '$lib/components/ui/hover-card/index.js';
	import * as Card from '$lib/components/ui/card';
	import { CornerRightUp, Info } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { generateSteps } from '$lib/steps.remote';
	import { zStep, type Step } from '$lib/utils';
	import { stepManager } from '$lib/steps.svelte';

	const { steps } = $derived(stepManager);
</script>

<h1 class="my-16 text-center text-4xl font-black">What big task or goal lies ahead of you?</h1>
<form {...generateSteps} class="flex gap-2">
	<Input name="prompt" placeholder="Just state it. We will break it down..." />
	<Button type="submit" size="icon">
		<CornerRightUp />
	</Button>
</form>
<!--
{#if isGenerating}
	<div class="my-4 text-center">
		<p class="text-muted-foreground">Breaking down your task into manageable steps...</p>
	</div>
{/if} -->

<div class="my-8 grid grid-cols-2 gap-4">
	{#if steps}
		{#each steps as res, idx (idx)}
			<Card.Root class="flex flex-col justify-between">
				<div class="flex flex-col gap-2">
					<Card.Header>
						<Card.Title>Small Step N° {idx}</Card.Title>
					</Card.Header>
					<Card.Content class="flex items-center justify-between gap-2">
						<span>
							{res.title}
							{#if res.isHabit}
								<span class="text-primary"> (habit) </span>
							{/if}
						</span>
						<HoverCard.Root>
							<HoverCard.Trigger>
								<Info size={20} />
							</HoverCard.Trigger>
							<HoverCard.Content
								><p>
									{res.description}
								</p>
								{#if res.isHabit && res.howOften}
									<p class="text-muted-foreground">
										Should be repeated {res.howOften}
									</p>
								{/if}
							</HoverCard.Content>
						</HoverCard.Root>
					</Card.Content>
				</div>
				<Card.Footer>
					<Button class="w-full" variant="destructive">Reject</Button>
				</Card.Footer>
			</Card.Root>
		{/each}
	{/if}
</div>
