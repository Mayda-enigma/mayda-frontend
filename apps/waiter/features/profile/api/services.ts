import { apiClient } from '@/shared/api/client';

export const profileService = {
  updatePassword: (payload: { currentPassword: string; newPassword: string }) =>
    apiClient<void>('/auth/me/password', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),

  updateProfile: (payload: { name: string; email: string }) =>
    apiClient<void>('/auth/me', {
      method: 'PATCH',
      body: JSON.stringify(payload),
    }),
};
