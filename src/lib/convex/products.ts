import { convexServer } from "./server";

export async function getProductBySlug(slug: string) {
  return await convexServer.query("products:getBySlug", { slug });
}