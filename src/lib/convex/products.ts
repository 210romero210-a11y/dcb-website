import { query } from "./server";

export async function getProductBySlug(slug: string) {
  return await query("products:getBySlug", { slug });
}