export type ConversationStatus = "active" | "idle" | "closed";

export interface Conversation {
  id: string;
  customer_name: string;
  customer_email: string;
  status: ConversationStatus;
  started_at: string;
}

export interface ConversationMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

export interface ConversationDetail extends Conversation {
  messages?: ConversationMessage[];
}

export interface ConversationsPage {
  items: Conversation[];
  total: number;
  has_more: boolean;
  next_cursor: string | null;
  limit: number;
}

export interface GetConversationsParams {
  cursor?: string;
  limit?: number;
  sort?: "asc" | "desc";
  search?: string;
  started_at_from?: string;
  started_at_to?: string;
}
