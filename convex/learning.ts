import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Log a learning event for the self-improving system
export const logLearningEvent = mutation({
  args: {
    type: v.string(), // ci_failure, test_failure, pr_issue, auto_fix_attempt
    file: v.string(),
    error: v.string(),
    fingerprint: v.string(),
    rootCause: v.optional(v.string()),
    fixApplied: v.optional(v.string()),
    ruleId: v.optional(v.string()),
    success: v.optional(v.boolean()),
    timestamp: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const timestamp = args.timestamp ?? Date.now();
    
    await ctx.db.insert("learning_events", {
      type: args.type,
      file: args.file,
      error: args.error,
      fingerprint: args.fingerprint,
      rootCause: args.rootCause,
      fixApplied: args.fixApplied,
      ruleId: args.ruleId,
      success: args.success,
      timestamp: timestamp,
    });
    
    return { success: true };
  },
});

// Get learning events for pattern analysis
export const getLearningEvents = query({
  args: {
    type: v.optional(v.string()),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    let query = ctx.db.table("learning_events");
    
    if (args.type) {
      query = query.eq("type", args.type);
    }
    
    query = query.order("desc").limit(args.limit ?? 100);
    
    const events = await query.collect();
    return events;
  },
});