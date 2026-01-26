import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import HeroMockup from "./hero-mockup";

function HeroSection() {
  return (
    <section className="relative overflow-hidden p-3">
      <div className="mx-auto max-w-7xl rounded-xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 px-6 py-16 text-white shadow-xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm">
              <Sparkles className="h-4 w-4" />
              AI-powered proposals
            </span>

            <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl xl:text-6xl">
              Turn website conversations into{" "}
              <span className="text-indigo-400">ready-to-send proposals</span>
            </h1>

            <p className="max-w-xl text-lg text-slate-300">
              Replace contact forms and sales calls with an AI assistant that
              understands client needs, negotiates pricing, and drafts proposals
              for your approval.
            </p>

            <div className="flex flex-wrap gap-4">
              <Button size="lg">Get started</Button>
              <Button size="lg" variant="outline">
                View demo
              </Button>
            </div>
          </div>

          {/* TODO: Add mockup */}
          <HeroMockup />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
