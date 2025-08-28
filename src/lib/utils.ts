import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import z from 'zod';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, 'child'> : T;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, 'children'> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };

export const zStep = z.object({
	title: z.string().describe('Title of the steps necessary to take'),
	description: z.string('More precise description of the task'),
	howOften: z
		.enum(['daily', 'weekly', 'monthly', 'once'])
		.describe(
			'How often should the step be repeated? If it is a habit it should of course be repeated multiple times.'
		)
});

export type Step = z.Infer<typeof zStep>;
