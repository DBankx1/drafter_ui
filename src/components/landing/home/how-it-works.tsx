import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Cable,
  ChevronRight,
  FileText,
  MessageSquare,
  Send,
} from "lucide-react";
import Image from "next/image";

function HowItWorksSection() {
  const steps = [
    {
      icon: MessageSquare,
      title: "AI chats with visitors",
      description:
        "Your trained assistant gathers requirements, answers questions, and discusses pricing.",
      image: "/images/landing/bot_talk.png",
    },
    {
      icon: FileText,
      title: "Proposal is created",
      description:
        "A detailed scope of work and estimate is drafted automatically based on the conversation.",
      image: "/images/landing/proposal_created.png",
    },
    {
      icon: Send,
      title: "You review & send",
      description:
        "Edit, approve, and send the final proposal when you’re ready.",
      image: "/images/landing/send_proposal.png",
    },
  ];

  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 flex flex-col items-center gap-4 text-center">
          <Badge
            className="border-primary/30 border shadow"
            variant="secondary"
          >
            <Cable className="h-4 w-4" />
            How drafter works
          </Badge>
          <h2 className="text-3xl font-bold">
            Turn conversations into proposals that convert
          </h2>
          <p className="w-100 text-center text-slate-600">
            Easy proposal generation for businesses and individuals, built for
            fast-growing modern teams.
          </p>
          <div>
            <Button>
              Talk to sales <ChevronRight />
            </Button>
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-3 md:px-6">
          {steps.map((step, index) => (
            <Card key={step.title} className="border-slate-200">
              <CardContent className="space-y-4 px-6 py-2">
                <div className="text-primary/40 text-md bg-accent w- w-fit rounded-md p-2 font-semibold">
                  0{index + 1}
                </div>

                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-primary/40 text-sm">{step.description}</p>
                <Image
                  src={step.image}
                  alt={step.title}
                  width={300}
                  height={200}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
