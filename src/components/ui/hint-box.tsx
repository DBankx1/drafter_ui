interface HintBoxProps {
  icon: string | React.ReactNode;
  title: string;
  children: string | React.ReactNode;
}

export default function HintBox({
  icon,
  title,
  children,
}: Readonly<HintBoxProps>) {
  return (
    <div
      style={{
        display: "flex",
        gap: 12,
        padding: "14px 16px",
        background: "#f8fafc",
        border: "1px solid #e2e8f0",
        borderRadius: 12,
      }}
    >
      <div style={{ fontSize: 18, flexShrink: 0, marginTop: 1 }}>{icon}</div>
      <div>
        <p
          style={{
            fontSize: 13,
            fontWeight: 600,
            color: "#0f172a",
            marginBottom: 3,
          }}
        >
          {title}
        </p>
        <p style={{ fontSize: 12.5, color: "#64748b", lineHeight: 1.65 }}>
          {children}
        </p>
      </div>
    </div>
  );
}
