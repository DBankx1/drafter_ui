import { Card, CardContent } from "@/components/ui/card";
import { FileText, MessageSquare, Send } from "lucide-react";

function HowItWorksSection() {
  const steps = [
    {
      icon: MessageSquare,
      title: "AI chats with visitors",
      description:
        "The assistant gathers requirements, answers questions, and discusses pricing.",
    },
    {
      icon: FileText,
      title: "Proposal is created",
      description:
        "A detailed scope of work and estimate is drafted automatically.",
    },
    {
      icon: Send,
      title: "You review & send",
      description: "Edit, approve, and send the proposal when you’re ready.",
    },
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-slate-600">
            From first message to proposal — without meetings or forms.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {steps.map((step) => (
            <Card key={step.title} className="border-slate-200">
              <CardContent className="space-y-4 p-6">
                <step.icon className="h-8 w-8 text-indigo-600" />
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-slate-600">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorksSection;
