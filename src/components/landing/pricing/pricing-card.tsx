import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import DashedSeparator from "@/components/ui/dashed-separator";
import { Check, ChevronRight } from "lucide-react";

interface PricingCardProps {
  title: string;
  price: string;
  frequency: string;
  features: string[];
  featuresHeader: string;
  description: string;
  ctaText: string;
  featured?: boolean;
}

export default function PricingCard({
  title,
  price,
  frequency,
  description,
  featuresHeader,
  features,
  ctaText,
  featured = false,
}: Readonly<PricingCardProps>) {
  return (
    <Card
      className={`w-80 ${featured && "dark:bg-secondary border-indigo-600 bg-indigo-50"}`}
    >
      <CardHeader>
        <CardTitle className="font-bold">{title}</CardTitle>
        <CardDescription className="mt-3 flex flex-col">
          <span className="mb-1 text-sm font-light">
            {price === "Free" ? "It's" : "Starts at"}
          </span>
          <div className="flex flex-row items-baseline gap-2">
            <span className="text-primary text-3xl font-bold">{price}</span>
            {price !== "Free" && (
              <span className="text-sm font-light">per {frequency}</span>
            )}
          </div>
          <span className="mt-4">{description}</span>
        </CardDescription>
        <CardContent className="mt-3 w-full px-0">
          <Button
            className={`mb-5 w-full cursor-pointer ${featured && "bg-indigo-600"}`}
          >
            {ctaText} <ChevronRight />
          </Button>
          <div>
            <DashedSeparator />
            <div className="mt-5">
              <span className="text-sm font-bold">{featuresHeader}</span>
              <div className="mt-3">
                {features.map((feature) => (
                  <div key={feature}>
                    <Checkbox checked={true} />
                    <span className="text-primary ml-2 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </CardHeader>
    </Card>
  );
}
