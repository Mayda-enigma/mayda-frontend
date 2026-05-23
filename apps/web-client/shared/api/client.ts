import { API_URL } from '../lib/env';

export class ApiError extends Error {
  status: number;
  body: unknown;

  constructor(status: number, body: unknown) {
    super(`API error: ${status}`);
    this.name = 'ApiError';
    this.status = status;
    this.body = body;
  }
}

export async function apiClient<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  const token = typeof window !== 'undefined' ? localStorage.getItem('mayda_token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { ...headers, ...(init?.headers as Record<string, string>) },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(res.status, body);
  }

  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}
