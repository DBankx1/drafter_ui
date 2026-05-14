"use client";

import { Code2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useWidget } from "./context";

export function AdvancedCard() {
  const { savedWidget } = useWidget();

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle className="text-sm">Advanced</CardTitle>
        <CardDescription className="text-xs">
          Technical configuration
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="mb-3 flex items-start gap-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
            <Code2 className="size-4 text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium leading-tight">Business ID</p>
            <p className="mt-0.5 text-xs text-muted-foreground">
              Automatically assigned. Links this widget to your account.
            </p>
          </div>
        </div>
        <div className="relative">
          <Input
            value={savedWidget?.business_id ?? ""}
            readOnly
            className="font-mono pr-24 text-muted-foreground"
            placeholder="Will appear after first save"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 rounded bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
            read-only
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
