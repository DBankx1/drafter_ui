import { redirect } from "next/navigation";
import { subDays } from "date-fns";
import { getConversations } from "@/lib/engagements/engagement-service";
import { EngagementsProvider } from "@/components/ui/engagements/context";
import { EngagementsHeader } from "@/components/ui/engagements/header";
import { EngagementsStats } from "@/components/ui/engagements/stats";
import { EngagementsFilters } from "@/components/ui/engagements/filters";
import { EngagementsList } from "@/components/ui/engagements/list";

async function loadPageData() {
  const weekAgo = subDays(new Date(), 7).toISOString();
  const [initialPage, weekPage] = await Promise.all([
    getConversations({ limit: 20, sort: "desc" }),
    getConversations({ limit: 1, started_at_from: weekAgo }),
  ]);
  return { initialPage, thisWeekTotal: weekPage.total };
}

export default async function EngagementsPage() {
  let data;
  try {
    data = await loadPageData();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    redirect(`/error?message=${encodeURIComponent(message)}`);
  }

  return (
    <div className="p-4 sm:p-6">
      <EngagementsProvider
        initialPage={data.initialPage}
        thisWeekTotal={data.thisWeekTotal}
      >
        <EngagementsHeader />
        <EngagementsStats />
        <EngagementsFilters />
        <EngagementsList />
      </EngagementsProvider>
    </div>
  );
}
