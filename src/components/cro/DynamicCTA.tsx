"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useTrackEvent } from "@/lib/analytics/useTrackEvent";
import { useExperimentVariant } from "@/lib/cro/useExperimentVariant";

interface DynamicCTAProps {
  productId: string;
  baseText: string;
  experimentName: string;
}

export function DynamicCTA({ productId, baseText, experimentName }: DynamicCTAProps) {
  const { trackEvent, sessionId } = useTrackEvent();
  const variant = useExperimentVariant(experimentName, sessionId);
  const [clicked, setClicked] = useState(false);

  // Determine CTA text based on variant
  const ctaText = variant === "control" 
    ? baseText 
    : variant === "urgency" 
      ? `Hurry! ${baseText}` 
      : variant === "social_proof" 
        ? `Join 1,234+ ${baseText.toLowerCase()}` 
        : baseText;

  const handleClick = async () => {
    if (clicked) return;
    setClicked(true);
    
    // Track CTA click
    await trackEvent("click_buy", { 
      productId, 
      experiment: experimentName,
      variant,
      ctaText
    });
    
    // In a real app, we would redirect to purchase here
    // For now, we just log
    console.log("Would redirect to purchase for product:", productId);
  };

  return (
    <Button 
      onClick={handleClick}
      disabled={clicked}
      className="w-full bg-primary hover:bg-primary/90 transition-colors"
    >
      {clicked ? "Processing..." : ctaText}
    </Button>
  );
}