import { query } from "./_generated/server";
import { v } from "convex/values";
import { eq } from "convex/server";

export const getBySlug = query({
  args: { slug: v.string() },
  handler: async (ctx) => {
    return await ctx.db.query("products").where("slug", eq(slug)).first();
  }
});