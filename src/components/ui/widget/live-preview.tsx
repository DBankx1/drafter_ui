"use client";

import { useWidget } from "./context";
import type { WidgetPosition } from "@/lib/types/widget";

function getContainerStyle(position: WidgetPosition) {
  const isRight = position.includes("right");
  const isBottom = position.includes("bottom");
  return {
    ...(isBottom ? { bottom: "10px" } : { top: "36px" }),
    ...(isRight ? { right: "10px" } : { left: "10px" }),
  };
}

export function LivePreview() {
  const { draft, savedWidget } = useWidget();
  const { name, primary_color, secondary_color, position, logo_url, welcome_message } =
    draft;

  const containerStyle = getContainerStyle(position);
  const fabAlign = position.includes("right") ? "flex-end" : "flex-start";

  return (
    <div className="sticky top-0 lg:top-16">
      <div className="mb-3 flex items-center justify-between">
        <p className="text-muted-foreground text-[11px] font-semibold tracking-widest uppercase">
          Live preview
        </p>
        <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
          <span className="size-1.5 animate-pulse rounded-full bg-emerald-500" />
          Auto-updating
        </span>
      </div>

      <div className="bg-card overflow-hidden rounded-xl border shadow-sm">
        {/* Mini browser frame */}
        <div
          className="relative overflow-hidden"
          style={{
            aspectRatio: "9/16",
            background: "linear-gradient(135deg, #e2e8f0, #f1f5f9)",
          }}
        >
          {/* Browser chrome */}
          <div className="absolute inset-x-0 top-0 z-10 flex h-7 items-center gap-1.5 border-b border-black/5 bg-white/70 px-2.5 backdrop-blur-sm">
            <span className="size-2 rounded-full bg-[#fc5f57]" />
            <span className="size-2 rounded-full bg-[#febc2e]" />
            <span className="size-2 rounded-full bg-[#27c840]" />
          </div>

          {/* Skeleton page */}
          <div className="pointer-events-none absolute inset-x-2.5 top-9 bottom-2.5 flex flex-col gap-2 opacity-25">
            <div className="h-2 w-2/3 rounded bg-slate-500" />
            <div className="h-2 w-full rounded bg-slate-500" />
            <div className="h-2 w-4/5 rounded bg-slate-500" />
            <div className="h-2 w-1/2 rounded bg-slate-500" />
            <div className="mt-1 h-6 w-1/3 rounded-md bg-slate-500" />
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <div className="h-12 rounded-lg bg-slate-500" />
              <div className="h-12 rounded-lg bg-slate-500" />
            </div>
          </div>

          {/* Widget */}
          <div className="absolute z-10" style={containerStyle}>
            {/* Chat panel */}
            <div className="mb-2 w-48 overflow-hidden rounded-2xl shadow-2xl">
              {/* Header */}
              <div
                className="flex items-center gap-2 px-3 py-2"
                style={{ background: primary_color }}
              >
                <div className="flex size-6 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/20">
                  {logo_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={logo_url}
                      alt="logo"
                      className="size-full object-contain"
                    />
                  ) : (
                    <span className="text-[7px] font-bold text-white/70">
                      AI
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-[9px] leading-tight font-bold text-white">
                    {name || "AI Assistant"}
                  </p>
                  <p className="text-[7px] text-white/60">● Online</p>
                </div>
                <button className="ml-auto text-xs leading-none text-white/50">
                  ×
                </button>
              </div>

              {/* Messages */}
              <div className="flex max-h-24 flex-col gap-1.5 overflow-hidden bg-slate-50 p-2">
                <div className="max-w-[85%] self-start rounded-md rounded-tl-sm bg-white px-2 py-1.5 text-[7px] leading-relaxed text-slate-600 shadow-sm">
                  {welcome_message || "Hi there! How can I help you today?"}
                </div>
                <div
                  className="max-w-[85%] self-end rounded-md rounded-tr-sm px-2 py-1.5 text-[7px] leading-relaxed text-white"
                  style={{ background: secondary_color }}
                >
                  I&apos;d like to get my roof fixed.
                </div>
                <div className="max-w-[85%] self-start rounded-md rounded-tl-sm bg-white px-2 py-1.5 text-[7px] leading-relaxed text-slate-600 shadow-sm">
                  Great! Tell me what you need to be fixed.
                </div>
              </div>

              {/* Input row */}
              <div className="flex items-center gap-1.5 border-t bg-white px-2 py-1.5">
                <div className="flex-1 rounded-full bg-slate-100 px-2 py-1 text-[7px] text-slate-400">
                  Type a message...
                </div>
                <div
                  className="flex size-5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: primary_color }}
                >
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13" />
                  </svg>
                </div>
              </div>
            </div>

            {/* FAB */}
            <div style={{ display: "flex", justifyContent: fabAlign }}>
              <div
                className="flex size-10 items-center justify-center rounded-xl shadow-lg"
                style={{ background: primary_color }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Embed snippet */}
        <div className="border-t p-4">
          <p className="text-muted-foreground mb-2 text-[11px] font-medium">
            Embed snippet
          </p>
          <div className="overflow-x-auto rounded-lg bg-[#1e1e2e] px-3 py-2.5 font-mono text-[11px] leading-relaxed">
            <span className="text-[#89b4fa]">&lt;script </span>
            <span className="text-[#89dceb]">src</span>
            <span className="text-white">=</span>
            <span className="text-[#a6e3a1]">
              &quot;https://widget.yourdomain.com/embed.js&quot;
            </span>
            <br />
            <span className="ml-4 text-[#89dceb]">data-id</span>
            <span className="text-white">=</span>
            <span className="text-[#a6e3a1]">
              &quot;{savedWidget?.business_id ?? "YOUR_ID"}&quot;
            </span>
            <span className="text-[#89b4fa]">&gt;&lt;/script&gt;</span>
          </div>
          <p className="text-muted-foreground mt-1.5 text-[11px]">
            Paste before the closing &lt;/body&gt; tag.
          </p>
        </div>
      </div>
    </div>
  );
}
