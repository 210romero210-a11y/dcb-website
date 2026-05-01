import { useState, useEffect } from "react";

/**
 * Hook for getting experiment variant assignment
 * In production, this would be more sophisticated and potentially server-side
 */
export function useExperimentVariant(experimentName: string, sessionId: string) {
  const [variant, setVariant] = useState<string>("control");

  useEffect(() => {
    // Check if we have a stored assignment
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(`dcb_exp_${experimentName}_${sessionId}`);
      if (stored) {
        setVariant(stored);
        return;
      }
    }

    // Assign variant (simple random for demo - in production would be from Convex)
    const rand = Math.random();
    const newVariant = rand < 0.33 ? "control" : rand < 0.66 ? "urgency" : "social_proof";
    
    // Store assignment
    if (typeof window !== "undefined") {
      localStorage.setItem(
        `dcb_exp_${experimentName}_${sessionId}`,
        newVariant
      );
    }
    
    setVariant(newVariant);
  }, [experimentName, sessionId]);

  return variant;
}