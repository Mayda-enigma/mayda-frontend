import { apiClient } from '@/shared/api/client';
import type { LoginResponseDto, LoginPayloadDto, RegisterPayloadDto, UserDto } from '../types';

export const authService = {
  login: (payload: LoginPayloadDto) =>
    apiClient<LoginResponseDto>('/auth/login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  register: (payload: RegisterPayloadDto) =>
    apiClient<LoginResponseDto>('/auth/register', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  me: () => apiClient<UserDto>('/auth/me'),
};
