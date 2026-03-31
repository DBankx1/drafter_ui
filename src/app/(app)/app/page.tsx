import { redirect } from "next/navigation";
import { getAuthTokens } from "@/lib/auth/cookies";

export default async function AppRootPage() {
  const tokens = await getAuthTokens();

  if (tokens?.access_token) {
    redirect("/dashboard");
  } else {
    redirect("/login");
  }
}
