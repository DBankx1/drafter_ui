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
    <div className="flex gap-3 rounded-xl border bg-muted/40 p-4">
      <div className="mt-0.5 shrink-0 text-lg">{icon}</div>
      <div>
        <p className="mb-1 text-sm font-semibold text-foreground">{title}</p>
        <p className="text-xs leading-relaxed text-muted-foreground">
          {children}
        </p>
      </div>
    </div>
  );
}
