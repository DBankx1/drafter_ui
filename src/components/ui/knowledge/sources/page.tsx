import { type KnowledgeBase } from "@/lib/knowledge/knowledge-base-service";
import { columns } from "@/components/ui/knowledge/sources/columns";
import { DataTable } from "@/components/ui/knowledge/sources/data-table";

export default async function KnowledgeBaseSourceTable({
  data,
}: Readonly<{ data: KnowledgeBase[] }>) {
  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  );
}
