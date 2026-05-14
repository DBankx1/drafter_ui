"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import { createWidget, updateWidget, deleteWidget } from "./widget-service";
import type { Widget, WidgetPayload } from "../types/widget";

interface WidgetActionResult {
  success: boolean;
  error?: string;
  data?: Widget;
}

export async function createWidgetAction(
  prevState: WidgetActionResult,
  payload: WidgetPayload,
): Promise<WidgetActionResult> {
  try {
    const result = await createWidget(payload);
    return { success: true, data: result };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function updateWidgetAction(
  prevState: WidgetActionResult,
  payload: WidgetPayload,
): Promise<WidgetActionResult> {
  try {
    const result = await updateWidget(payload);
    return { success: true, data: result };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function deleteWidgetAction(
  prevState: WidgetActionResult,
): Promise<WidgetActionResult> {
  try {
    await deleteWidget();
    return { success: true };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
