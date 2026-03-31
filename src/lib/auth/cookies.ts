import { cookies } from "next/headers";
import { type AuthResponse, type TokenResponse } from "./auth-service";

export const COOKIE_NAMES = {
  accessToken: "access_token",
  refreshToken: "refresh_token",
} as const;

const BASE_COOKIE_OPTIONS = {
  httpOnly: true, // not accessible via JS — XSS protection
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export async function setAuthCookies(tokens: AuthResponse) {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAMES.accessToken, tokens.access_token, {
    ...BASE_COOKIE_OPTIONS,
    maxAge: 60 * 15, // 15 minutes — match your JWT expiry
  });

  cookieStore.set(COOKIE_NAMES.refreshToken, tokens.refresh_token, {
    ...BASE_COOKIE_OPTIONS,
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAuthCookies() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAMES.accessToken);
  cookieStore.delete(COOKIE_NAMES.refreshToken);
}

export async function getAuthTokens(): Promise<TokenResponse | null> {
  const cookieStore = await cookies();
  const access_token = cookieStore.get(COOKIE_NAMES.accessToken)?.value;
  const refresh_token = cookieStore.get(COOKIE_NAMES.refreshToken)?.value;

  if (!access_token || !refresh_token) return null;

  return { access_token, refresh_token };
}
