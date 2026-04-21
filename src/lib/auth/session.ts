import { getSupabaseClient } from "../supabase";
import { getAuthTokens } from "./cookies";

export type Session = {
  userId: string;
  email: string;
  name: string;
  accessToken: string;
};

export async function getSession(): Promise<Session | null> {
  const tokens = await getAuthTokens();
  if (!tokens) return null;

  const supabase = getSupabaseClient();

  // Verifies the token with Supabase — not just a decode
  const { data, error } = await supabase.auth.getUser(tokens.access_token);

  if (error || !data.user) return null;

  return {
    userId: data.user.id,
    email: data.user.email ?? "",
    name: data.user.user_metadata?.name ?? "",
    accessToken: tokens.access_token,
  };
}
