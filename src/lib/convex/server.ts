import { ConvexClient } from "convex/client";

if (!process.env.CONVEX_URL) {
  throw new Error("CONVEX_URL is not defined");
}

export const convexServer = new ConvexClient(process.env.CONVEX_URL);