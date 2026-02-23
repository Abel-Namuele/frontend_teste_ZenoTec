/** @format */

import { Candidate, PaginationMeta, CandidateFormData } from "../types/candidate";
import { DashboardStats } from "../types/dashboard";
import { getSession } from "next-auth/react";


const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api";

async function getHeaders(): Promise<HeadersInit> {
  const session = await getSession();
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (session?.token) headers["Authorization"] = `Bearer ${session.token}`;
  return headers;
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const headers = await getHeaders();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: { ...headers, ...options.headers },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Erro na requisição.");
  return json;
}

export interface ListParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export const candidatesApi = {
  list: (params: ListParams = {}) => {
    const qs = new URLSearchParams(
      Object.entries(params)
        .filter(([, v]) => v)
        .map(([k, v]) => [k, String(v)]),
    );
    return request<{
      success: boolean;
      data: Candidate[];
      pagination: PaginationMeta;
    }>(`/candidates?${qs}`);
  },
  get: (id: string) =>
    request<{ success: boolean; data: Candidate }>(`/candidates/${id}`),
  create: (data: CandidateFormData) =>
    request<{ success: boolean; data: Candidate }>("/candidates", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, data: Partial<CandidateFormData>) =>
    request<{ success: boolean; data: Candidate }>(`/candidates/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),
  remove: (id: string) => request(`/candidates/${id}`, { method: "DELETE" }),
};

export const dashboardApi = {
  stats: () =>
    request<{ success: boolean; data: DashboardStats }>("/dashboard/stats"),
};

export const exportApi = {
  excel: () => `${BASE_URL}/export/excel`,
  pdf: () => `${BASE_URL}/export/pdf`,
};
