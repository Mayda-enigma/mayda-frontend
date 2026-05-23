import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authKeys } from './queryKeys';
import { authService } from './services';
import { toLoginPayloadDto } from './mappers';
import type { LoginInput, RegisterInput, RegisterPayloadDto, StaffLoginInput, OtpVerificationInput } from '../types';

function setTokenCookie(token: string) {
  document.cookie = `mayda_token=${token}; path=/; max-age=604800; SameSite=Lax`;
}

function clearTokenCookie() {
  document.cookie = 'mayda_token=; path=/; max-age=0; SameSite=Lax';
}

export const useLogin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: LoginInput) =>
      authService.login(toLoginPayloadDto(input)),
    onSuccess: (data) => {
      localStorage.setItem('mayda_token', data.access_token);
      setTokenCookie(data.access_token);
      qc.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
};

export const useStaffLogin = () =>
  useMutation({
    mutationFn: (input: StaffLoginInput) =>
      authService.staffLogin({ phone: input.phone, password: input.password }),
  });

export const useVerifyOtp = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: OtpVerificationInput) =>
      authService.verifyOtp({ tempToken: input.tempToken, otpCode: input.otpCode }),
    onSuccess: (data) => {
      localStorage.setItem('mayda_token', data.access_token);
      setTokenCookie(data.access_token);
      qc.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
};

export const useRegister = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: RegisterInput) =>
      authService.register(input as RegisterPayloadDto),
    onSuccess: (data) => {
      localStorage.setItem('mayda_token', data.access_token);
      setTokenCookie(data.access_token);
      qc.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
};

export const useLogout = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('mayda_token');
      clearTokenCookie();
    },
    onSuccess: () => {
      qc.clear();
    },
  });
};
