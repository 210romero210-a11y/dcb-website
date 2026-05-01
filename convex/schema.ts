import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    slug: v.string(),
    title: v.string(),
    description: v.string(),
    longDescription: v.optional(v.string()),
    price: v.number(),
    currency: v.optional(v.string()),
    imageUrl: v.string(),
    isFeatured: v.boolean(),
    category: v.optional(v.string()),
    modules: v.optional(v.array(v.object({ title: v.string(), description: v.string() }))),
    purchaseUrl: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_slug", ["slug"]),

  subscribers: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    status: v.literal("active", "unsubscribed"),
    subscribedAt: v.number(),
    tags: v.optional(v.array(v.string())),
  }).index("by_email", ["email"]),

  events: defineTable({
    type: v.literal("page_view", "signup", "product_view"),
    path: v.string(),
    userAgent: v.optional(v.string()),
    timestamp: v.number(),
  }),
});