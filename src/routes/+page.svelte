<script>
	import { CornerRightUp } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import Input from '$lib/components/ui/input/input.svelte';
</script>

<div class="flex gap-2">
	<Input class="w-full pr-12" />
	<Button size="icon"><CornerRightUp /></Button>
</div>
