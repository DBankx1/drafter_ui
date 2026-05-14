import { fetchWithAuth } from "../auth/api-client";
import type { Widget, WidgetPayload } from "../types/widget";

export async function getWidget(): Promise<Widget | null> {
  const res = await fetchWithAuth(`${process.env.API_BASE_URL}api/v1/widget`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (res.status === 404) return null;

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Failed to fetch widget");
  }

  return res.json();
}

export async function createWidget(payload: WidgetPayload): Promise<Widget> {
  const res = await fetchWithAuth(`${process.env.API_BASE_URL}api/v1/widget`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Failed to create widget");
  }

  return res.json();
}

export async function updateWidget(payload: WidgetPayload): Promise<Widget> {
  const res = await fetchWithAuth(`${process.env.API_BASE_URL}api/v1/widget`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Failed to update widget");
  }

  return res.json();
}

export async function deleteWidget(): Promise<void> {
  const res = await fetchWithAuth(`${process.env.API_BASE_URL}api/v1/widget`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Failed to delete widget");
  }
}
