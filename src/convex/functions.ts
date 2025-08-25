import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { stepObject } from './schema';

// Return the last 100 tasks in a given task list.
export const getSteps = query({
	handler: async (ctx) => {
		const steps = await ctx.db.query('step').take(100);
		return steps;
	}
});

export const insertStep = mutation({
	args: { step: stepObject },
	handler: async (ctx, { step }) => {
		await ctx.db.insert('step', { ...step });
	}
});

export const deleteStep = mutation({
	args: { stepId: v.id('step') },
	handler: async (ctx, args) => {
		await ctx.db.delete(args.stepId);
	}
});
