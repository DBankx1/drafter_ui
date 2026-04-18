import { KnowledgeBaseInfo } from "@/components/ui/knowledge/info";
import KnowledgeBaseSources from "@/components/ui/knowledge/sources";
import KnowledgeBaseUploadSources from "@/components/ui/knowledge/upload-sources";
import { getKnowlegeBaseList } from "@/lib/knowledge/knowledge-base-service";
import { redirect } from "next/navigation";

export default async function Page() {
  let knowledgebases;
  try {
    knowledgebases = await getKnowlegeBaseList();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    redirect(`/error?message=${encodeURIComponent(message)}`);
  }

  return (
    <div className="p-2 md:p-4">
      <KnowledgeBaseInfo />
      <KnowledgeBaseUploadSources />
      <KnowledgeBaseSources kbList={knowledgebases} />
    </div>
  );
}
