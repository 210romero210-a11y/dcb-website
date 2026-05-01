import { NextResponse } from "next/server";
import { trackEvent } from "@/convex/_generated/actions"; // This will be generated after we define the action

export async function POST(request: Request) {
  try {
    const event = await request.json();
    // Call the Convex action to track the event
    await trackEvent(event);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error tracking event:", error);
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}