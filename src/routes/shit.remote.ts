import { form } from '$app/server';
import { z } from 'zod';
import { generateObject } from 'ai';
import { error } from '@sveltejs/kit';
import { OPENAI_KEY } from '$env/static/private';
import { createGateway } from '@ai-sdk/gateway';

const gateway = createGateway({
	apiKey: OPENAI_KEY
});

export const generateSteps = form(async (formData) => {
	const prompt = formData.get('prompt');

	if (!prompt) return error(400, 'No prompt');

	const res = await generateObject({
		model: gateway('openai/gpt-5-mini'),
		prompt: prompt.toString(),
		schema: z.object({
			title: z.string().describe('Title of the steps necessary to take'),
			isHabit: z.boolean().describe('If the step should be repeated or not'),
			description: z.string('More precise description of the task'),
			howOften: z
				.enum(['daily', 'weekly', 'hourly', 'monthly'])
				.nullable()
				.describe('If a habit, how often should the step be repeated')
		}),
		output: 'array',
		maxRetries: 5,
		system:
			'You are an assistant who processes the prompt, which optimally should be a goal or big task and should turn it into smaller, swallowable doable steps.'
	});

	return res.object;
});
