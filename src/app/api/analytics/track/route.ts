import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const event = await request.json();
    
    const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;
    if (!convexUrl) {
      throw new Error("NEXT_PUBLIC_CONVEX_URL is not defined");
    }
    
    const actionEndpoint = `${convexUrl}/api/action`;
    const response = await fetch(actionEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: "actions:trackEvent",
        args: event,
      }),
    });
    
    if (!response.ok) {
      throw new Error(`Convex action failed: ${response.statusText}`);
    }
    
    const result = await response.json();
    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("Error tracking event:", error);
    return NextResponse.json({ error: "Failed to track event" }, { status: 500 });
  }
}