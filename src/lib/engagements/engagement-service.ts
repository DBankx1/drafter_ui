"use server";

import { fetchWithAuth } from "@/lib/auth/api-client";
import type {
  ConversationsPage,
  ConversationDetail,
  GetConversationsParams,
} from "@/lib/types/engagement";

function buildQuery(params: GetConversationsParams): string {
  const q = new URLSearchParams();
  if (params.cursor) q.set("cursor", params.cursor);
  if (params.limit) q.set("limit", String(params.limit));
  if (params.sort) q.set("sort", params.sort);
  if (params.search) q.set("search", params.search);
  if (params.started_at_from) q.set("started_at_from", params.started_at_from);
  if (params.started_at_to) q.set("started_at_to", params.started_at_to);
  return q.toString();
}

export async function getConversations(
  params: GetConversationsParams = {},
): Promise<ConversationsPage> {
  const qs = buildQuery(params);
  const url = `${process.env.API_BASE_URL}api/v1/chat/conversations${qs ? `?${qs}` : ""}`;
  const res = await fetchWithAuth(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Failed to fetch conversations");
  }
  return res.json();
}

export async function getConversationById(
  id: string,
): Promise<ConversationDetail> {
  const url = `${process.env.API_BASE_URL}api/v1/chat/conversations/${id}`;
  const res = await fetchWithAuth(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.detail ?? "Failed to fetch conversation");
  }
  return res.json();
}
