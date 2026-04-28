"use server";

import type { PricingConfig, PricingConfigResponse } from "@/lib/types/pricing";
import { createPricingConfig } from "@/lib/pricing/pricing-service";

interface UploadPricingConfigAction {
  error?: string;
  data?: PricingConfigResponse;
  success: boolean;
}

export async function CreatePricingConfigAction(
  prevState: UploadPricingConfigAction,
  pricingConfig: PricingConfig,
): Promise<UploadPricingConfigAction> {
  try {
    const result = await createPricingConfig(pricingConfig);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
