/** @format */

export type CandidateStatus = "pending" | "approved" | "rejected";

export interface Candidate {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: string;
  experience_years: number;
  skills: string[];
  linkedin?: string;
  status: CandidateStatus;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface CandidateFormData {
  name: string;
  email: string;
  phone?: string;
  role: string;
  experience_years: number;
  skills: string[];
  linkedin?: string;
  status: CandidateStatus;
  notes?: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  pagination?: PaginationMeta;
  errors?: { msg: string; path: string }[];
}
