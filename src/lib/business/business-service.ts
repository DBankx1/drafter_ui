import type { Business } from "@/lib/types/business";
import { fetchWithAuth } from "@/lib/auth/api-client";

export async function getMyBusiness(): Promise<Business> {
  const res = await fetchWithAuth(
    `${process.env.API_BASE_URL}api/v1/business/me`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Failed to fetch business");
  }

  return res.json();
}
