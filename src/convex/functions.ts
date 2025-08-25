import { v } from 'convex/values';
import { mutation, query } from './_generated/server';

// Return the last 100 tasks in a given task list.
export const getSteps = query({
	handler: async (ctx) => {
		const steps = await ctx.db.query('step').take(100);
		return steps;
	}
});

export const insertStep = mutation({
	args: {
		title: v.string(),
		description: v.string(),
		isHabit: v.boolean(),
		howOften: v.optional(v.string()),
		goalId: v.id('goal')
	},
	handler: async (ctx, step) => {
		await ctx.db.insert('step', step);
	}
});

export const insertGoal = mutation({
	args: {
		title: v.string()
	},
	handler: async (ctx, { title }) => {
		const newGoalId = await ctx.db.insert('goal', { title });

		return newGoalId;
	}
});

export const deleteStep = mutation({
	args: { stepId: v.id('step') },
	handler: async (ctx, args) => {
		await ctx.db.delete(args.stepId);
	}
});
