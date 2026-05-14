import { redirect } from "next/navigation";
import { KnowledgeBaseProvider } from "@/components/ui/knowledge/context";
import { KnowledgeBaseHeader } from "@/components/ui/knowledge/header";
import { KnowledgeBaseInfo } from "@/components/ui/knowledge/info";
import KnowledgeBaseUploadSources from "@/components/ui/knowledge/upload-sources";
import KnowledgeBaseSources from "@/components/ui/knowledge/sources";
import { getKnowlegeBaseList } from "@/lib/knowledge/knowledge-base-service";

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
      <KnowledgeBaseProvider initialSources={knowledgebases ?? []}>
        <KnowledgeBaseHeader />
        <KnowledgeBaseInfo />
        <KnowledgeBaseUploadSources />
        <KnowledgeBaseSources />
      </KnowledgeBaseProvider>
    </div>
  );
}
