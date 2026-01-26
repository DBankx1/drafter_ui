import { Check } from "lucide-react";

function FeaturesSection() {
  const features = [
    "Embeddable chat widget",
    "Pricing-aware AI conversations",
    "Editable proposals & estimates",
    "PDF & web-based proposals",
    "Dashboard notifications",
    "Client status tracking",
  ];

  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold">
              Everything you need to close faster
            </h2>
            <p className="mt-4 max-w-lg text-slate-600">
              Designed to replace manual consultations while keeping you fully
              in control.
            </p>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2">
            {features.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <Check className="mt-1 h-5 w-5 text-indigo-600" />
                <span className="text-slate-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default FeaturesSection;
