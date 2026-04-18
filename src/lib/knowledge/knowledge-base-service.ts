import type { KnowledgeBase } from "@/types/knowledge-base";
import { fetchWithAuth } from "../auth/api-client";

export async function UploadPDFKnowledgeBase(
  file: File,
): Promise<KnowledgeBase> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetchWithAuth(
    `${process.env.API_BASE_URL}api/v1/knowledge-base/upload/pdf`,
    {
      method: "POST",
      body: formData,
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Error occurred uploading PDF");
  }

  return res.json();
}

export async function UploadTextKnowledgeBase(
  label: string,
  content: string,
): Promise<KnowledgeBase> {
  const payload = { label, content };
  const res = await fetchWithAuth(
    `${process.env.API_BASE_URL}api/v1/knowledge-base/upload/txt`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    const error_detail =
      typeof error.detail === "string" ? error.detail : error.detail[0]?.msg;
    throw new Error(error_detail ?? "Error occurred uploading PDF");
  }

  return res.json();
}

export async function UploadUrlKnowledgeBase(
  url: string,
): Promise<KnowledgeBase> {
  const res = await fetchWithAuth(
    `${process.env.API_BASE_URL}api/v1/knowledge-base/upload/url?url=${encodeURIComponent(url)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    console.log(error);
    const error_detail =
      typeof error.detail === "string" ? error.detail : error.detail[0]?.msg;
    throw new Error(error_detail ?? "Error occurred Indexing URL");
  }

  return res.json();
}

export async function getKnowlegeBaseList(): Promise<KnowledgeBase[]> {
  const res = await fetchWithAuth(
    `${process.env.API_BASE_URL}api/v1/knowledge-base`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.detail ?? "Failed to fetch knowledge base list");
  }

  return res.json();
}
