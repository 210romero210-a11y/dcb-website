const CONVEX_URL = process.env.NEXT_PUBLIC_CONVEX_URL;

if (!CONVEX_URL) {
  throw new Error("NEXT_PUBLIC_CONVEX_URL is not defined");
}

export async function query<T = any>(path: string, args: Record<string, any> = {}): Promise<T> {
  const response = await fetch(`${CONVEX_URL}/api/query`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, args }),
  });

  if (!response.ok) {
    throw new Error(`Convex query failed: ${response.statusText}`);
  }

  const result = await response.json();
  if (result.status !== "success") {
    throw new Error(`Convex query failed: ${result.status}`);
  }
  return result.value;
}

export async function mutation<T = any>(path: string, args: Record<string, any> = {}): Promise<T> {
  const response = await fetch(`${CONVEX_URL}/api/mutation`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, args }),
  });

  if (!response.ok) {
    throw new Error(`Convex mutation failed: ${response.statusText}`);
  }

  const result = await response.json();
  return result;
}

export async function action<T = any>(path: string, args: Record<string, any> = {}): Promise<T> {
  const response = await fetch(`${CONVEX_URL}/api/action`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, args }),
  });

  if (!response.ok) {
    throw new Error(`Convex action failed: ${response.statusText}`);
  }

  const result = await response.json();
  return result;
}
