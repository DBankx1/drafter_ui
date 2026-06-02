import { notFound, redirect } from "next/navigation";
import { getConversationById } from "@/lib/engagements/engagement-service";
import { EngagementDetail } from "@/components/ui/engagements/detail";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EngagementDetailPage({ params }: PageProps) {
  const { id } = await params;

  let conversation;
  try {
    conversation = await getConversationById(id);
  } catch (error) {
    if (error instanceof Error && error.message.includes("not found")) {
      notFound();
    }
    const message = error instanceof Error ? error.message : "Unknown error";
    redirect(`/error?message=${encodeURIComponent(message)}`);
  }

  return (
    <div className="p-4 sm:p-6">
      <EngagementDetail conversation={conversation} />
    </div>
  );
}
