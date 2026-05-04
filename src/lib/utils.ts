import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple CSS class names into a single optimized string. This helps
 * manage conditional and overlapping Tailwind CSS classes cleanly.
 *
 * Args:
 *   inputs: A list of class name strings to be merged and deduplicated.
 *
 * Returns:
 *   A single string containing the merged and optimized class names.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
