import { Badge } from "@/components/ui/badge";
import { Wrench, FileText, Brain, Zap, TrendingUp } from "lucide-react";
import Image from "next/image";

function UseCasesSection() {
  const useCases = ["Agencies", "Consultants", "Freelancers", "Contractors"];

  const features = [
    {
      icon: FileText,
      title: "Intelligent Quote Generation",
      description:
        "Create professional, AI-powered quotes instantly. Reduce manual proposal writing time, generate accurate pricing estimates, and close deals faster with automated quote creation.",
      image: "/images/landing/illustration.png",
    },
    {
      icon: Brain,
      title: "Advanced Client Requirements Analysis",
      description:
        "Transform vague client requests into detailed project specifications. AI-driven requirement parsing ensures comprehensive understanding, reduces scope creep, and improves project delivery.",
      image: "/images/landing/illustration.png",
    },
    {
      icon: Zap,
      title: "Intelligent Business Assistant",
      description:
        "Get instant answers about your services, offerings, and business details. AI chatbot provides real-time support, improves client communication, and answers FAQs automatically.",
      image: "/images/landing/illustration.png",
    },
    {
      icon: TrendingUp,
      title: "Accelerated Proposal-to-Close Pipeline",
      description:
        "Convert customizable proposals into signed contracts at lightning speed. Streamline the sales process, reduce proposal turnaround time, and increase conversion rates significantly.",
      image: "/images/landing/illustration.png",
    },
  ];

  return (
    <section className="border-t-2 py-24">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-6 text-center">
        <Badge className="border-primary/30 border shadow" variant="secondary">
          <Wrench className="h-4 w-4" />
          Use Cases
        </Badge>
        <h2 className="mb-4 text-center text-3xl font-bold">
          Built for service businesses
        </h2>
        <div className="flex flex-wrap justify-center gap-4">
          {useCases.map((item) => (
            <span
              key={item}
              className="dark:bg-secondary dark:border-primary/30 rounded-full border bg-white px-6 py-2 text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mt-16 w-full">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={index}
                  className="dark:bg-secondary/50 dark:border-primary/20 border-primary/10 hover:border-primary/30 dark:from-secondary/30 dark:to-secondary/50 rounded-lg border bg-gradient-to-br from-white to-gray-50 p-8 transition-all duration-300 hover:shadow-lg"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="dark:bg-primary/20 bg-primary/10 rounded-lg p-3">
                      <IconComponent className="text-primary h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold">{feature.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>

                  {/* replace with image of app working */}
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    width={300}
                    height={200}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default UseCasesSection;
