import { Button } from "@/components/ui/button";

function CallToActionSection() {
  return (
    <section className="bg-indigo-600 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h2 className="text-3xl font-bold sm:text-4xl">
          Start converting conversations today
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-indigo-100">
          Set up your AI assistant once and let it handle incoming leads 24/7.
        </p>
        <div className="mt-8">
          <Button size="lg" variant="secondary">
            Create your AI assistant
          </Button>
        </div>
      </div>
    </section>
  );
}

export default CallToActionSection;
