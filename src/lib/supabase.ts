import { createClient } from "@supabase/supabase-js";

export function getSupabaseClient() {
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SECRET_KEY!,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
}

export async function getSignedUrl(
  bucket: string,
  path: string,
  expiresIn: number = 60,
  options?: { download?: boolean },
): Promise<string> {
  const supabase = getSupabaseClient();
  const url = await supabase.storage
    .from(bucket)
    .createSignedUrl(path, expiresIn, options);
  if (url.error) {
    throw new Error(url.error.message);
  }
  return url.data?.signedUrl;
}
