"use client";

import { createContext, useContext, useState } from "react";
import type { Widget, WidgetPayload } from "@/lib/types/widget";

const DEFAULT_DRAFT: WidgetPayload = {
  name: "AI Assistant",
  primary_color: "#1A1A2E",
  secondary_color: "#FF6B47",
  position: "bottom_right",
  logo_url: "",
  welcome_message: "Hi there! How can I help you today?",
};

interface WidgetContextValue {
  draft: WidgetPayload;
  savedWidget: Widget | null;
  isDirty: boolean;
  updateDraft: (updates: Partial<WidgetPayload>) => void;
  discard: () => void;
  setSavedWidget: (widget: Widget | null) => void;
}

const WidgetContext = createContext<WidgetContextValue | null>(null);

function toPayload(widget: Widget): WidgetPayload {
  return {
    name: widget.name ?? "AI Assistant",
    primary_color: widget.primary_color,
    secondary_color: widget.secondary_color,
    position: widget.position,
    logo_url: widget.logo_url ?? "",
    welcome_message: widget.welcome_message,
  };
}

export function WidgetProvider({
  initialWidget,
  children,
}: {
  initialWidget: Widget | null;
  children: React.ReactNode;
}) {
  const initialPayload = initialWidget ? toPayload(initialWidget) : DEFAULT_DRAFT;

  const [draft, setDraft] = useState<WidgetPayload>(initialPayload);
  const [savedPayload, setSavedPayload] = useState<WidgetPayload>(initialPayload);
  const [savedWidget, setSavedWidgetState] = useState<Widget | null>(initialWidget);

  const isDirty = JSON.stringify(draft) !== JSON.stringify(savedPayload);

  function updateDraft(updates: Partial<WidgetPayload>) {
    setDraft((prev) => ({ ...prev, ...updates }));
  }

  function discard() {
    setDraft(savedPayload);
  }

  function setSavedWidget(widget: Widget | null) {
    setSavedWidgetState(widget);
    const payload = widget ? toPayload(widget) : DEFAULT_DRAFT;
    setSavedPayload(payload);
    setDraft(payload);
  }

  return (
    <WidgetContext.Provider
      value={{ draft, savedWidget, isDirty, updateDraft, discard, setSavedWidget }}
    >
      {children}
    </WidgetContext.Provider>
  );
}

export function useWidget() {
  const ctx = useContext(WidgetContext);
  if (!ctx) throw new Error("useWidget must be used within WidgetProvider");
  return ctx;
}
