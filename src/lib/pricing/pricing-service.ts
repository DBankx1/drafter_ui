import { fetchWithAuth } from "../auth/api-client";
import type { PricingConfigResponse, ServiceConfig } from "../types/pricing";

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

export async function createServiceConfig(
  serviceConfig: ServiceConfig,
): Promise<ServiceConfig> {
  const res = await fetchWithAuth(
    `${process.env.API_BASE_URL}api/v1/pricing/services`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceConfig),
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Failed to create a service");
  }

  return res.json();
}

export async function updateServiceConfig(
  id: string,
  serviceConfig: ServiceConfig,
): Promise<ServiceConfig> {
  const res = await fetchWithAuth(
    `${process.env.API_BASE_URL}api/v1/pricing/services/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(serviceConfig),
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Failed to update service");
  }

  return res.json();
}

export async function deleteServiceConfig(id: string): Promise<void> {
  const res = await fetchWithAuth(
    `${process.env.API_BASE_URL}api/v1/pricing/services/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Failed to delete service");
  }

  return res.json();
}
