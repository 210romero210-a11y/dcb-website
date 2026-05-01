// convex/schema.ts
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Core product information
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
  })
    .index("by_slug", ["slug"])
    .index("by_featured", ["isFeatured"])
    .index("by_category", ["category"]),

  // Track product views with session context
  product_views: defineTable({
    productId: v.id("products"),
    sessionId: v.string(),
    userId: v.optional(v.string()), // if authenticated
    timestamp: v.number(),
    referrer: v.optional(v.string()),
    userAgent: v.optional(v.string()),
  })
    .index("by_product", ["productId"])
    .index("by_session", ["sessionId"])
    .index("by_time", ["timestamp"]),

  // General user events for analytics
  user_events: defineTable({
    eventId: v.string(), // unique identifier like uuid
    sessionId: v.string(),
    userId: v.optional(v.string()),
    productId: v.optional(v.id("products")), // if product-related
    eventType: v.string(), // page_view, product_view, click_buy, scroll_depth, etc.
    properties: v.optional(v.any()), // flexible JSON for extra data
    timestamp: v.number(),
    url: v.string(),
    referrer: v.optional(v.string()),
  })
    .index("by_session", ["sessionId"])
    .index("by_event_type", ["eventType"])
    .index("by_product", ["productId"])
    .index("by_time", ["timestamp"]),

  // A/B testing experiments
  experiments: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    variants: v.array(v.object({
      id: v.string(),
      name: v.string(),
      weight: v.number(), // for traffic allocation
    })),
    isActive: v.boolean(),
    startTime: v.number(),
    endTime: v.optional(v.number()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_active", ["isActive"])
    .index("by_time", ["startTime", "endTime"]),

  // Experiment assignments (which variant a user sees)
  experiment_assignments: defineTable({
    experimentId: v.id("experiments"),
    sessionId: v.string(),
    userId: v.optional(v.string()),
    variantId: v.string(),
    assignedAt: v.number(),
  })
    .index("by_experiment_session", ["experimentId", "sessionId"])
    .index("by_user", ["userId"]),

  // Product recommendations (can be precomputed or dynamic)
  recommendations: defineTable({
    productId: v.id("products"),
    recommendedProductId: v.id("products"),
    score: v.number(), // higher = more relevant
    reason: v.optional(v.string()), // e.g., "viewed_together", "bought_together"
    updatedAt: v.number(),
  })
    .index("by_product", ["productId"])
    .index("by_score", ["score"]),

  // Pricing rules for discounts, bundles, time-based offers
  pricing_rules: defineTable({
    name: v.string(),
    description: v.optional(v.string()),
    type: v.union(v.literal("discount"), v.literal("bundle"), v.literal("time_offer")),
    discountPercentage: v.optional(v.number()), // for discount type
    bundleProductIds: v.optional(v.array(v.id("products"))), // for bundle type
    startsAt: v.optional(v.number()), // timestamp
    endsAt: v.optional(v.number()), // timestamp
    couponCode: v.optional(v.string()), // if applicable
    appliesTo: v.optional(v.array(v.id("products"))), // empty = all products
    isActive: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_active", ["isActive"])
    .index("by_time_range", ["startsAt", "endsAt"])
    .index("by_coupon", ["couponCode"]),

  // Email subscribers (for Kit integration)
  subscribers: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("unsubscribed")),
    tags: v.optional(v.array(v.string())), // Kit tags
    subscribedAt: v.number(),
    unsubscribedAt: v.optional(v.number()),
    source: v.optional(v.string()), // e.g., "homepage", "product_page"
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"])
    .index("by_source", ["source"]),

  // Blog posts for content and SEO
  blog_posts: defineTable({
    slug: v.string(),
    title: v.string(),
    excerpt: v.string(),
    content: v.string(), // HTML or markdown
    author: v.string(),
    publishedAt: v.number(),
    tags: v.optional(v.array(v.string())),
    featuredImage: v.optional(v.string()),
    isPublished: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_slug", ["slug"])
    .index("by_published", ["isPublished", "publishedAt"])
    .index("by_tag", ["tags"]),
});