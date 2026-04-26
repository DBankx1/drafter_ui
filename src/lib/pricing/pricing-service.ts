import { fetchWithAuth } from "../auth/api-client";
import type { PricingConfigResponse } from "../types/pricing";

export async function getPricingConfigs(): Promise<PricingConfigResponse> {
  const res = await fetchWithAuth(`${process.env.API_BASE_URL}api/v1/pricing`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Failed to fetch pricing configs");
  }

  return res.json();
}
