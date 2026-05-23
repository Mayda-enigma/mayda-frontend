import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authKeys } from './queryKeys';
import { authService } from './services';
import { toLoginPayloadDto } from './mappers';
import type { LoginInput, RegisterInput, RegisterPayloadDto } from '../types';

export const useLogin = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: LoginInput) =>
      authService.login(toLoginPayloadDto(input)),
    onSuccess: (data) => {
      localStorage.setItem('mayda_token', data.access_token);
      qc.invalidateQueries({ queryKey: authKeys.currentUser() });
    },
  });
};

export const useRegister = () => {
  return useMutation({
    mutationFn: (input: RegisterInput) =>
      authService.register(input as RegisterPayloadDto),
  });
};

export const useLogout = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      localStorage.removeItem('mayda_token');
    },
    onSuccess: () => {
      qc.clear();
    },
  });
};
