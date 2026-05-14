"use client";

import { Bot, ImageIcon, Palette } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ColorPicker } from "./color-picker";
import { LogoUploader } from "./logo-uploader";
import { useWidget } from "./context";

const MAX_NAME_LENGTH = 50;

function SectionIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
      {children}
    </div>
  );
}

export function BrandingCard() {
  const { draft, updateDraft } = useWidget();

  return (
    <Card>
      <CardHeader className="border-b">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-sm">Branding</CardTitle>
            <CardDescription className="mt-0.5 text-xs">
              Make the widget feel like your brand
            </CardDescription>
          </div>
          <div className="flex">
            <div
              className="size-5 rounded-full border-2 border-background shadow ring-1 ring-border"
              style={{ background: draft.primary_color }}
            />
            <div
              className="-ml-1.5 size-5 rounded-full border-2 border-background shadow ring-1 ring-border"
              style={{ background: draft.secondary_color }}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div>
          <div className="mb-3 flex items-start gap-3">
            <SectionIcon>
              <ImageIcon className="size-4 text-muted-foreground" />
            </SectionIcon>
            <div>
              <p className="text-sm font-medium leading-tight">Logo</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Shown in the widget header. Square images work best.
              </p>
            </div>
          </div>
          <LogoUploader
            value={draft.logo_url}
            onChange={(url) => updateDraft({ logo_url: url })}
          />
        </div>

        <Separator />

        <div>
          <div className="mb-3 flex items-start gap-3">
            <SectionIcon>
              <Bot className="size-4 text-muted-foreground" />
            </SectionIcon>
            <div>
              <p className="text-sm font-medium leading-tight">
                Assistant name
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Displayed in the widget header to your visitors.
              </p>
            </div>
          </div>
          <div className="relative">
            <Input
              value={draft.name}
              onChange={(e) => updateDraft({ name: e.target.value })}
              maxLength={MAX_NAME_LENGTH}
              placeholder="AI Assistant"
              className="pr-14"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[11px] tabular-nums text-muted-foreground">
              {draft.name.length}/{MAX_NAME_LENGTH}
            </span>
          </div>
        </div>

        <Separator />

        <div>
          <div className="mb-4 flex items-start gap-3">
            <SectionIcon>
              <Palette className="size-4 text-muted-foreground" />
            </SectionIcon>
            <div>
              <p className="text-sm font-medium leading-tight">Colours</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Primary is the header; secondary is user messages.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <ColorPicker
              label="Primary"
              value={draft.primary_color}
              onChange={(c) => updateDraft({ primary_color: c })}
            />
            <ColorPicker
              label="Secondary"
              value={draft.secondary_color}
              onChange={(c) => updateDraft({ secondary_color: c })}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
