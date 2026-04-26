import PricingConfigPage from "@/components/ui/pricing/pricing-setup";
import { getPricingConfigs } from "@/lib/pricing/pricing-service";
import { redirect } from "next/navigation";

export default async function Page() {
  let pricingConfig;
  try {
    pricingConfig = await getPricingConfigs();
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    redirect(`/error?message=${encodeURIComponent(message)}`);
  }

  return (
    <div className="p-2 md:p-4">
      <PricingConfigPage services={pricingConfig.config_json.services} />
    </div>
  );
}
