import { apiClient } from '@/shared/api/client';
import type { LoginResponseDto, LoginPayloadDto, RegisterPayloadDto, UserDto, StaffLoginPayloadDto, TempTokenResponseDto, OtpVerificationDto } from '../types';

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

  staffLogin: (payload: StaffLoginPayloadDto) =>
    apiClient<TempTokenResponseDto>('/auth/staff-login', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  verifyOtp: (payload: OtpVerificationDto) =>
    apiClient<LoginResponseDto>('/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),
};
