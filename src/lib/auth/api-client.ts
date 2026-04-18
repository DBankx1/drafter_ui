"use server";
import { redirect } from "next/navigation";
import { getAuthTokens } from "./cookies";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export async function fetchWithAuth(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  const session = await getAuthTokens();
  if (!session) {
    redirect("/login");
  }

  try {
    const response = await fetch(url, {
      ...options,
      credentials: options?.credentials ?? "include",
      headers: {
        ...options?.headers,
        authorization: `Bearer ${session.access_token}`,
      },
    });

    if (response.status === 401) {
      redirect("/login");
    }

    return response;
  } catch (error) {
    if (isRedirectError(error)) throw error;
    throw error;
  }
}
