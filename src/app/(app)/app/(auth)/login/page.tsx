import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";
import { getAuthTokens } from "@/lib/auth/cookies";
import Image from "next/image";

export default async function LoginPage() {
  const tokens = await getAuthTokens();
  if (tokens?.access_token) redirect("/dashboard");

  return (
    <main className="">
      <div className="relative flex grow flex-col">
        <Image
          src="/images/auth/background.jpg"
          alt="Cover Image"
          className="bg-img"
          width={0}
          height={0}
        />
        <div className="flex min-h-screen items-center justify-center">
          <div className="px-2 sm:px-0">
            <LoginForm />
          </div>
        </div>
      </div>
    </main>
  );
}
