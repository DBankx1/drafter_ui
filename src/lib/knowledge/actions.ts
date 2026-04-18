"use server";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import {
  UploadPDFKnowledgeBase,
  UploadTextKnowledgeBase,
  UploadUrlKnowledgeBase,
} from "./knowledge-base-service";
import type { KnowledgeBase } from "@/types/knowledge-base";

interface UploadKnowledgeBaseAction {
  error?: string;
  data?: KnowledgeBase;
  success: boolean;
}

export async function uploadPDFKnowledgeBaseAction(
  prevState: UploadKnowledgeBaseAction,
  formData: FormData,
): Promise<UploadKnowledgeBaseAction> {
  const file = formData.get("file") as File;

  if (!file || file.size === 0) {
    return { success: false, error: "No file provided." };
  }

  if (!file.type.includes("pdf")) {
    return { success: false, error: "Only PDF files are allowed." };
  }

  if (file.size > 10 * 1024 * 1024) {
    return { success: false, error: "File size must be less than 10 MB." };
  }

  try {
    const result = await UploadPDFKnowledgeBase(file);
    return { success: true, data: result };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function uploadTextKnowledgeBaseAction(
  prevState: UploadKnowledgeBaseAction,
  label: string,
  content: string,
): Promise<UploadKnowledgeBaseAction> {
  try {
    const result = await UploadTextKnowledgeBase(label, content);
    return { success: true, data: result };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}

export async function uploadUrlKnowledgeBaseAction(
  prevState: UploadKnowledgeBaseAction,
  url: string,
): Promise<UploadKnowledgeBaseAction> {
  try {
    const result = await UploadUrlKnowledgeBase(url);
    return { success: true, data: result };
  } catch (error) {
    if (isRedirectError(error)) throw error;
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
}
