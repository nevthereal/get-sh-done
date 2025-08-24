<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher defaultMode="dark" />

<nav class="flex gap-2 p-4">
	<h1 class="text-4xl font-bold">get (sh)it done</h1>
</nav>
<div class="mx-auto max-w-3xl">
	{@render children?.()}
</div>
