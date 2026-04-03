"use server";

import { redirect } from "next/navigation";
import { getSession } from "./session";

/**
 * Fetch wrapper that enforces authentication for protected API endpoints.
 *
 * - Checks if session exists before making request
 * - If no session: redirects to /login
 * - If response is 401 (Unauthorized): redirects to /login
 * - Otherwise: returns response as-is for caller to handle
 *
 * @param url - The API endpoint URL
 * @param options - Standard fetch options
 * @returns Response object from fetch
 * @throws Redirects to /login if authentication fails
 */
export async function fetchWithAuth(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  // Check if session exists
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  // Make the fetch request
  const response = await fetch(url, {
    ...options,
    // Ensure cookies are sent with request
    credentials: options?.credentials ?? "include",
    headers: {
      ...options?.headers,
      // Add auth token to header if not already present
      ...(options?.headers &&
      typeof options.headers === "object" &&
      !("authorization" in options.headers)
        ? { authorization: `Bearer ${session.accessToken}` }
        : {}),
    },
  });

  // Handle 401 - token expired or invalid
  if (response.status === 401) {
    redirect("/login");
  }

  return response;
}
