import { requireAuth } from "@/lib/auth/protected-page";
import { getMyBusiness } from "@/lib/business/business-service";
import { BusinessProvider } from "@/context/business-context";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Verify user is authenticated, redirects to /login if not
  const session = await requireAuth();

  // Fetch business data, redirect to error page if fetch fails
  let business;
  try {
    business = await getMyBusiness();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    redirect(`/error?message=${encodeURIComponent(message)}`);
  }

  // Combine session and business data for context
  const authenticatedUser = {
    name: session.name || session.email,
    email: session.email,
    avatar: "", // Placeholder - can be expanded later with profile photos
  };

  return (
    <BusinessProvider
      initialBusiness={business}
      initialUser={authenticatedUser}
    >
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 72)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <main>{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </BusinessProvider>
  );
}
