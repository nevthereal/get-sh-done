import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const stepType = v.object({
	title: v.string(),
	description: v.string(),
	howOften: v.union(
		v.literal('once'),
		v.literal('daily'),
		v.literal('weekly'),
		v.literal('monthly')
	),
	goalId: v.id('goal')
});

export default defineSchema({
	step: defineTable(stepType),
	goal: defineTable(
		v.object({
			title: v.string()
		})
	)
});
