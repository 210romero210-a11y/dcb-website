"use client";

import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * Hook for tracking user events with session persistence
 * For critical events (purchases, form submissions), use server actions instead
 */
export function useTrackEvent() {
  const [sessionId] = useState<string>(() => {
    // Guard against non-browser environments and localStorage access errors
    if (typeof window === "undefined") {
      return uuidv4();
    }

    try {
      const existing = window.localStorage.getItem("dcb_session_id");
      return existing || uuidv4();
    } catch {
      // Fall back to an in-memory session ID if localStorage is unavailable
      return uuidv4();
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      window.localStorage.setItem("dcb_session_id", sessionId);
    } catch {
      // Ignore localStorage write errors (e.g., privacy mode, quota issues)
    }
  }, [sessionId]);

  const trackEvent = async (eventName: string, properties: Record<string, unknown> = {}) => {
    // Skip tracking in non-browser environments (e.g., during SSR)
    if (typeof window === "undefined") {
      return;
    }

    try {
      // Send event to analytics endpoint
      // In a real app, this would be your analytics endpoint (e.g., /api/analytics)
      await fetch("/api/analytics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventName,
          properties,
          sessionId,
          timestamp: Date.now(),
        }),
      });
    } catch (error) {
      // Log error but don't break UI - analytics failures shouldn't block user actions
      console.warn("Failed to track event:", error);
    }
  };

  return { trackEvent, sessionId };
}