export type PricingType = "fixed" | "hourly" | "tiered";

export interface ServiceOption {
  name: string;
  price: number;
}

export interface ServiceConfig {
  id: string;
  name: string;
  description?: string;
  pricing_type: PricingType;
  base_price: number;
  options: ServiceOption[];
}

export interface PricingConfig {
  services: ServiceConfig[];
}

export interface PricingConfigResponse {
  business_id: string;
  config_json: PricingConfig;
  created_at: Date;
  updated_at: Date;
}

export const PRICING_TYPE_LABELS: Record<PricingType, string> = {
  fixed: "Fixed Price",
  hourly: "Hourly Rate",
  tiered: "Tiered Pricing",
};
