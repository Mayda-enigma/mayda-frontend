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

export function clearAuth() {
  localStorage.removeItem('mayda_token');
  document.cookie = 'mayda_token=; path=/; max-age=0; SameSite=Lax';
}

export function redirectToLogin() {
  if (typeof window !== 'undefined') {
    window.location.href = '/login';
  }
}

export async function apiClient<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': 'true',
  };

  const token = typeof window !== 'undefined' ? localStorage.getItem('mayda_token') : null;
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_URL}${path}`, {
    ...init,
    headers: { ...headers, ...(init?.headers as Record<string, string>) },
  });

  if (res.status === 401) {
    clearAuth();
    redirectToLogin();
    throw new ApiError(res.status, 'Session expired. Please log in again.');
  }

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new ApiError(res.status, body);
  }

  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}
