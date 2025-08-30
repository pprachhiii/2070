// lib/cookies.ts
import { cookies } from "next/headers";
import { randomUUID } from "crypto";

/**
 * Ensures every visitor has a stable anonymous ID stored in a cookie.
 * Returns the anonId (either existing or newly set).
 */
export async function getOrSetAnonId(): Promise<string> {
  const store = await cookies();
  const cookieName = "anon_id";

  // Try to get existing cookie
  const existing = store.get(cookieName)?.value;
  if (existing) {
    return existing;
  }

  // Create a new anon id
  const newId = randomUUID();
  store.set(cookieName, newId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  });

  return newId;
}
