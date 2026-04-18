import { KNOWLEDGE_BASE_META } from "@/types/knowledge-base";

interface FileIconProps {
  type: "pdf" | "text" | "url";
  size: number;
}

export default function FileIcon({ type, size }: Readonly<FileIconProps>) {
  const m = KNOWLEDGE_BASE_META[type] || KNOWLEDGE_BASE_META.pdf;

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        background: m.bg,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      <span
        style={{
          fontSize: 9,
          fontWeight: 700,
          color: m.color,
          letterSpacing: "0.04em",
          fontFamily: "monospace",
        }}
      >
        {m.label}
      </span>
    </div>
  );
}
