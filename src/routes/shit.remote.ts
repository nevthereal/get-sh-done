import { form } from '$app/server';
import { createOpenAI } from '@ai-sdk/openai';
import { generateText, streamText } from 'ai';
import { error } from '@sveltejs/kit';
import { OPENAI_KEY } from '$env/static/private';
import { createGateway } from '@ai-sdk/gateway';

const gateway = createGateway({
	apiKey: OPENAI_KEY
});

export const callAi = form(async (formData) => {
	const prompt = formData.get('prompt');

	if (!prompt) return error(400, 'No prompt');

	const res = streamText({
		model: gateway('openai/gpt-5'),
		prompt: prompt.toString()
	});

	for await (const textPart of res.textStream) {
		console.log(textPart);
	}
});
