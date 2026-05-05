"use server";

import type { ServiceConfig } from "@/lib/types/pricing";
import {
  createServiceConfig,
  deleteServiceConfig,
  updateServiceConfig,
} from "@/lib/pricing/pricing-service";

interface UploadServiceConfigAction {
  error?: string;
  data?: ServiceConfig;
  success: boolean;
}

export async function CreateServiceConfigAction(
  prevState: UploadServiceConfigAction,
  serviceConfig: ServiceConfig,
): Promise<UploadServiceConfigAction> {
  try {
    const result = await createServiceConfig(serviceConfig);
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

export async function UpdateServiceConfigAction(
  prevState: UploadServiceConfigAction,
  id: string,
  serviceConfig: ServiceConfig,
): Promise<UploadServiceConfigAction> {
  try {
    const result = await updateServiceConfig(id, serviceConfig);
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

export async function DeleteServiceConfigAction(
  prevState: UploadServiceConfigAction,
  id: string,
): Promise<UploadServiceConfigAction> {
  try {
    await deleteServiceConfig(id);
    return {
      success: true,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
