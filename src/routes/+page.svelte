<script>
	import { CornerRightUp } from '@lucide/svelte';
	import { smoothStream } from 'ai';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
	import { Chat } from '@ai-sdk/svelte';
	import { callAi } from './shit.remote';

	// const chat = new Chat({});
</script>

<form {...callAi} class="flex gap-2">
	<Input name="prompt" class="w-full pr-12" />
	<Button size="icon"><CornerRightUp /></Button>
</form>
