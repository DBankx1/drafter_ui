"use server";
import { redirect } from "next/navigation";
import { isRedirectError } from "next/dist/client/components/redirect-error";
import {
  getAuthTokens,
  refreshAuthSession,
  clearAuthCookies,
  isTokenExpired,
} from "./cookies";

function buildAuthHeaders(
  existingHeaders: HeadersInit | undefined,
  accessToken: string,
): Headers {
  const headers = new Headers(existingHeaders);
  headers.set("authorization", `Bearer ${accessToken}`);
  return headers;
}

export async function fetchWithAuth(
  url: string,
  options?: RequestInit,
): Promise<Response> {
  let session = await getAuthTokens();
  if (!session) {
    redirect("/login");
  }

  if (isTokenExpired(session.access_token)) {
    const refreshed = await refreshAuthSession();
    if (!refreshed) {
      redirect("/login");
    }
    session = refreshed;
  }

  const requestOptions: RequestInit = {
    ...options,
    credentials: options?.credentials ?? "include",
    headers: buildAuthHeaders(options?.headers, session.access_token),
  };

  try {
    const response = await fetch(url, requestOptions);

    if (response.status === 401) {
      const refreshed = await refreshAuthSession();
      if (!refreshed) {
        redirect("/login");
      }

      const retryOptions: RequestInit = {
        ...options,
        credentials: options?.credentials ?? "include",
        headers: buildAuthHeaders(options?.headers, refreshed.access_token),
      };

      const retryResponse = await fetch(url, retryOptions);
      if (retryResponse.status === 401) {
        await clearAuthCookies();
        redirect("/login");
      }
      return retryResponse;
    }

    return response;
  } catch (error) {
    if (isRedirectError(error)) throw error;
    throw error;
  }
}
