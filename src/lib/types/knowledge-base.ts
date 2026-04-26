export enum KnowledgeBaseType {
  URL = "URL",
  PDF = "PDF",
  TEXT = "TEXT",
}

export const KNOWLEDGE_BASE_META = {
  pdf: {
    label: KnowledgeBaseType.PDF,
    color: "#dc2626",
    bg: "#fef2f2",
    icon: "pdf",
  },
  text: {
    label: KnowledgeBaseType.TEXT,
    color: "#2563eb",
    bg: "#eff6ff",
    icon: "txt",
  },
  url: {
    label: KnowledgeBaseType.URL,
    color: "#16a34a",
    bg: "#f0fdf4",
    icon: "url",
  },
};

export type KnowledgeBase = {
  id: string;
  business_id: string;
  source_type: KnowledgeBaseType;
  status: KnowledgeBaseStatus;
  source_reference: string;
  uploaded_at: Date;
  meta: any;
  name: string;
  size_bytes?: number;
  tag?: string;
};

export enum KnowledgeBaseStatus {
  PENDING = "PENDING",
  PROCESSED = "PROCESSED",
  ERROR = "ERROR",
}

export interface KnowledgeBaseActions {
  onView?: (item: KnowledgeBase) => void;
  onDelete?: (item: KnowledgeBase) => void;
  onDownload?: (item: KnowledgeBase) => void;
}
