import { redirect } from "next/navigation";
import { getAuthTokens } from "@/lib/auth/cookies";
import HomePage from "../../(landing)/page";

export default async function Page() {
  const tokens = await getAuthTokens();

  if (tokens?.access_token) {
    redirect("/dashboard");
  }

  return <HomePage />;
}
