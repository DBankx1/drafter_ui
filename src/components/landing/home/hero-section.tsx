import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import HeroMockup from "./hero-mockup";
import { Badge } from "@/components/ui/badge";

function HeroSection() {
  return (
    <section className="relative overflow-hidden p-3">
      <div className="bg-primary-foreground mx-auto max-w-7xl rounded-xl border-2 px-6 py-16 md:py-30">
        <div className="grid gap-12 md:px-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-2">
            <Badge
              className="border-primary/30 border shadow"
              variant="secondary"
            >
              <Sparkles className="h-4 w-4" />
              AI-powered proposals
            </Badge>

            <h1 className="text-4xl leading-tight font-bold tracking-tight sm:text-5xl xl:text-5xl">
              The better way to turn conversations into proposals{" "}
            </h1>

            <p className="text-primary/40 text-md max-w-xl">
              Replace contact forms and sales calls with an AI assistant that
              understands client needs, negotiates pricing, and drafts proposals
              for your approval.
            </p>

            <div className="mt-5 flex flex-col flex-wrap gap-4">
              <Button size="lg">Get started</Button>
              <Button size="lg" variant="outline">
                Sign up with email
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
