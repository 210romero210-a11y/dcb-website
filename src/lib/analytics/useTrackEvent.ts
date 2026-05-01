"use client";

import { useState, useCallback } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * Hook for tracking user events with session persistence
 * For critical events (purchases, form submissions), use server actions instead
 */
export function useTrackEvent() {
  const [sessionId, setSessionId] = useState<string>(() => {
    return localStorage.getItem("dcb_session_id") || uuidv4();
  });

  // Initialize session ID on first load (client-side only)
  if (typeof window !== "undefined" && !localStorage.getItem("dcb_session_id")) {
    localStorage.setItem("dcb_session_id", sessionId);
  }

  const trackEvent = useCallback(
    async (eventType: string, properties: Record<string, any> = {}) => {
      // Skip if not in browser (SSR)
      if (typeof window === "undefined") return;

      const event = {
        eventId: uuidv4(),
        sessionId,
        eventType,
        properties,
        timestamp: Date.now(),
        url: window.location.href,
        referrer: document.referrer || undefined,
      };

      // Send to analytics endpoint (Convex action)
      try {
        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(event),
        });
      } catch (error) {
        console.error("Failed to track event:", error);
        // Don't break UI if tracking fails
      }
    },
    [sessionId]
  );

  return { trackEvent, sessionId };
}