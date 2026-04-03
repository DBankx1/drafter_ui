import { SidebarProvider } from "@/components/ui/sidebar";
import Link from "next/link";

export default async function ErrorPage({ params }: any) {
  const errorMessage = (await params.message) || "An error occurred";

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-1 items-center justify-center">
        <div className="space-y-4 text-center">
          <h1 className="text-2xl font-bold">Something went wrong</h1>
          <p className="text-muted-foreground">{errorMessage}</p>
          <Link
            href="/dashboard"
            className="bg-primary text-primary-foreground hover:bg-primary/90 inline-block rounded-md px-4 py-2"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </SidebarProvider>
  );
}
