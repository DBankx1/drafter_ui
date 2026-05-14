export type WidgetPosition =
  | "top_left"
  | "top_right"
  | "bottom_left"
  | "bottom_right";

export interface Widget {
  id: number;
  business_id: string;
  name: string;
  primary_color: string;
  secondary_color: string;
  position: WidgetPosition;
  logo_url: string;
  welcome_message: string;
  created_at: string;
  updated_at: string;
}

export interface WidgetPayload {
  name: string;
  primary_color: string;
  secondary_color: string;
  position: WidgetPosition;
  logo_url: string;
  welcome_message: string;
}
