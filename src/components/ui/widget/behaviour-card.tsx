"use client";

import { LayoutTemplate, MessageSquareText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PositionSelector } from "./position-selector";
import { useWidget } from "./context";

const MAX_WELCOME_LENGTH = 200;

function SectionIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
      {children}
    </div>
  );
}

export function BehaviourCard() {
  const { draft, updateDraft } = useWidget();

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-sm">Behaviour</CardTitle>
        <CardDescription className="text-xs">
          Control how the widget presents itself
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        <div>
          <div className="mb-3 flex items-start gap-3">
            <SectionIcon>
              <MessageSquareText className="size-4 text-muted-foreground" />
            </SectionIcon>
            <div>
              <p className="text-sm font-medium leading-tight">
                Welcome message
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                The first message visitors see when they open the widget.
              </p>
            </div>
          </div>
          <Textarea
            value={draft.welcome_message}
            onChange={(e) =>
              updateDraft({ welcome_message: e.target.value })
            }
            maxLength={MAX_WELCOME_LENGTH}
            rows={3}
            placeholder="Hi there! How can I help you today?"
            className="resize-none"
          />
          <p className="mt-1.5 text-right text-xs text-muted-foreground">
            {draft.welcome_message.length}/{MAX_WELCOME_LENGTH}
          </p>
        </div>

        <Separator />

        <div>
          <div className="mb-3 flex items-start gap-3">
            <SectionIcon>
              <LayoutTemplate className="size-4 text-muted-foreground" />
            </SectionIcon>
            <div>
              <p className="text-sm font-medium leading-tight">
                Widget position
              </p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Where the chat bubble appears on your website.
              </p>
            </div>
          </div>
          <PositionSelector
            value={draft.position}
            onChange={(pos) => updateDraft({ position: pos })}
          />
        </div>
      </CardContent>
    </Card>
  );
}
