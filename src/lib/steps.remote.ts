import { form } from '$app/server';
import { streamObject } from 'ai';
import { error } from '@sveltejs/kit';
import { OPENAI_KEY } from '$env/static/private';
import { createGateway } from '@ai-sdk/gateway';
import { zStep } from '$lib/utils';
import { ConvexHttpClient } from 'convex/browser';
import { PUBLIC_CONVEX_URL } from '$env/static/public';
import { api } from '$convex/_generated/api';

const client = new ConvexHttpClient(PUBLIC_CONVEX_URL);

const gateway = createGateway({
	apiKey: OPENAI_KEY
});

export const generateSteps = form(async (formData) => {
	const prompt = formData.get('prompt');

	if (!prompt) return error(400, 'No prompt');

	const { elementStream } = streamObject({
		model: gateway('openai/gpt-5-mini'),
		prompt: prompt.toString(),
		schema: zStep,
		output: 'array',
		maxRetries: 5,
		system:
			'You are an assistant who processes the prompt, which optimally should be a goal or big task and should turn it into smaller, swallowable doable steps.'
	});

	for await (const step of elementStream) {
		client.mutation(api.functions.insertStep, { step });
	}
});
