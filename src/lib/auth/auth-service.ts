const API_BASE_URL = process.env.API_BASE_URL;

export type AuthUser = {
  id: string;
  email: string;
  created_at: string;
};

export type AuthResponse = {
  user: AuthUser;
  access_token: string;
  refresh_token: string;
  token_type?: string;
  expires_in?: number;
};

export type SignupResponse = {
  user: AuthUser;
  message: string;
  access_token: string;
  refresh_token: string;
};

export type TokenResponse = {
  access_token: string;
  refresh_token: string;
};

export async function login(
  email: string,
  password: string,
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}api/v1/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Login Failed");
  }

  return res.json();
}

export async function signup(
  email: string,
  password: string,
  full_name: string,
): Promise<SignupResponse> {
  const res = await fetch(`${API_BASE_URL}api/v1/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, full_name }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Signup Failed");
  }

  return res.json();
}

export async function apiRefreshToken(
  refresh_token: string,
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE_URL}api/v1/auth/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token }),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Token refresh failed");
  }

  return res.json();
}
