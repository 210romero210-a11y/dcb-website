import { action } from "./_generated/server";
import { v } from "convex/values";

// Server-side action for tracking events
export const trackEvent = action({
  args: {
    eventId: v.string(),
    sessionId: v.string(),
    userId: v.optional(v.string()),
    eventType: v.string(),
    productId: v.optional(v.id("products")),
    properties: v.optional(v.any()),
    timestamp: v.number(),
    url: v.string(),
    referrer: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Insert into user_events table
    await ctx.db.insert("user_events", {
      eventId: args.eventId,
      sessionId: args.sessionId,
      userId: args.userId,
      eventType: args.eventType,
      productId: args.productId,
      properties: args.properties,
      timestamp: args.timestamp,
      url: args.url,
      referrer: args.referrer,
    });

    // If it's a product view, also insert into product_views for easier querying
    if (args.eventType === "product_view" && args.productId) {
      await ctx.db.insert("product_views", {
        productId: args.productId,
        sessionId: args.sessionId,
        userId: args.userId,
        timestamp: args.timestamp,
        referrer: args.referrer,
        userAgent: "", // We don't have user agent in the args, but we can get it from headers in the API route
        // Note: We are not capturing user agent here. We could pass it from the API route.
      });
    }

    return { success: true };
  }
});