"use server";

import { redirect } from "next/navigation";
import { login, signup, type AuthResponse } from "./auth-service";
import { setAuthCookies, clearAuthCookies } from "./cookies";

export type ActionResult = {
  error?: string;
};

export async function loginAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Email and password are required" };
  }

  try {
    const response = await login(email, password);
    await setAuthCookies(response);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Login failed" };
  }

  redirect("/app/dashboard");
}

export async function signupAction(
  _prev: ActionResult,
  formData: FormData,
): Promise<ActionResult> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!name || !email || !password) {
    return { error: "All fields are required" };
  }

  try {
    const response = await signup(name, email, password);
    const signupAuthTokens: AuthResponse = {
      user: response.user,
      access_token: response.access_token,
      refresh_token: response.refresh_token,
    };
    await setAuthCookies(signupAuthTokens);
  } catch (err) {
    return { error: err instanceof Error ? err.message : "Signup failed" };
  }

  redirect("/dashboard");
}

export async function logoutAction() {
  await clearAuthCookies();
  redirect("/login");
}
