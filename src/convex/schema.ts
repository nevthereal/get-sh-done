import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
	step: defineTable(
		v.object({
			title: v.string(),
			description: v.string(),
			isHabit: v.boolean(),
			howOften: v.optional(v.string()),
			goalId: v.id('goal')
		})
	),
	goal: defineTable(
		v.object({
			title: v.string()
		})
	)
});
