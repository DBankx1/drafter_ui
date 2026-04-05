import { KnowledgeBaseInfo } from "@/components/ui/knowledge/info";
import KnowledgeBaseSources from "@/components/ui/knowledge/sources";

export default function Page() {
  return (
    <div className="p-2 md:p-4">
      <KnowledgeBaseInfo />
      <KnowledgeBaseSources />
    </div>
  );
}
