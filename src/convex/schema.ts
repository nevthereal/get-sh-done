import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export const stepObject = v.object({
	title: v.string(),
	description: v.string(),
	isHabit: v.boolean(),
	howOften: v.optional(v.string())
});

export default defineSchema({
	step: defineTable(stepObject)
});
