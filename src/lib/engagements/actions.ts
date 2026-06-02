"use server";

import {
  getConversations,
  getConversationById,
} from "./engagement-service";
import type {
  ConversationsPage,
  ConversationDetail,
  GetConversationsParams,
} from "@/lib/types/engagement";

export interface FetchConversationsResult {
  data?: ConversationsPage;
  error?: string;
}

export interface FetchConversationDetailResult {
  data?: ConversationDetail;
  error?: string;
}

export async function fetchConversationsAction(
  params: GetConversationsParams,
): Promise<FetchConversationsResult> {
  try {
    const data = await getConversations(params);
    return { data };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to fetch conversations",
    };
  }
}

export async function fetchConversationDetailAction(
  id: string,
): Promise<FetchConversationDetailResult> {
  try {
    const data = await getConversationById(id);
    return { data };
  } catch (error) {
    return {
      error:
        error instanceof Error ? error.message : "Failed to fetch conversation",
    };
  }
}
