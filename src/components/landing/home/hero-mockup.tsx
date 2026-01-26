import { FileText, MessageSquare } from "lucide-react";

function HeroMockup() {
  return (
    <div className="relative rounded-2xl border border-white/10 bg-slate-950/60 p-6 shadow-2xl">
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <MessageSquare className="h-4 w-4" /> Visitor chat
        </div>
        <div className="rounded-lg bg-slate-900 p-4 text-sm">
          "I need a marketing website for my startup"
        </div>
        <div className="rounded-lg bg-indigo-600/20 p-4 text-sm">
          "Based on your needs, I recommend our Startup Website Package..."
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <FileText className="h-4 w-4" /> Proposal generated
        </div>
      </div>
    </div>
  );
}

export default HeroMockup;
