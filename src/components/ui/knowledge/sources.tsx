"use client";

import { useState } from "react";
import {
  KnowledgeBaseStatus,
  KnowledgeBaseType,
  type KnowledgeBase,
} from "@/types/knowledge-base";
import { KnowledgeBaseTable } from "@/components/ui/knowledge/sources/table";

export default function KnowledgeBaseSources({
  kbList,
}: Readonly<{ kbList: KnowledgeBase[] }>) {
  const [kb, setKb] = useState(kbList);

  return (
    <div>
      <p className="text-upper text-primary/50 text-xs font-bold tracking-wider uppercase">
        Your Knowledge Sources
      </p>
      <KnowledgeBaseTable
        className="mt-4"
        data={kb}
        onView={(item) => console.log(`/sources/${item.id}`)}
        onDownload={(item) => console.log(item)}
        onDelete={(item) => console.log(item.id)}
        onAddSource={() => console.log(true)}
      />
    </div>
  );
}
