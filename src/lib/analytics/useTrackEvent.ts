"use client";

import { useState, useCallback, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

/**
 * Hook for tracking user events with session persistence
 * For critical events (purchases, form submissions), use server actions instead
 */
export function useTrackEvent() {
  const [sessionId, setSessionId] = useState<string>("");

  useEffect(() => {
    const stored = localStorage.getItem("dcb_session_id");
    if (stored) {
      setSessionId(stored);
    } else {
      const newId = uuidv4();
      localStorage.setItem("dcb_session_id", newId);
      setSessionId(newId);
    }
  }, []);

  const trackEvent = useCallback(
    async (eventType: string, properties: Record<string, any> = {}) => {
      // Skip if not in browser (SSR) or if sessionId is not yet set
      if (typeof window === "undefined" || !sessionId) return;

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