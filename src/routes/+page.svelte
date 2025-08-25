<script lang="ts">
	import { CornerRightUp } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { generateSteps } from '$lib/steps.remote';
	import { useQuery } from 'convex-svelte';
	import { api } from '$convex/_generated/api';
	import StepCard from '$lib/components/StepCard.svelte';

	const steps = useQuery(api.functions.getSteps, {});
</script>

<div class="my-16 text-center">
	<h1 class="mb-2 text-4xl font-black">What big task or goal lies ahead of you?</h1>
	<h3 class="text-lg text-muted-foreground italic">Don't worry, we will break it down for you</h3>
</div>
<form {...generateSteps} class="flex gap-2">
	<Input name="prompt" placeholder="Just state it..." />
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
	{#if steps.data}
		{#each steps.data as step, index (index)}
			<StepCard {index} {step} />{/each}
	{/if}
</div>
