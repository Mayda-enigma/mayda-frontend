import { useMutation } from '@tanstack/react-query';
import { profileService } from './services';
import { toPasswordPayload } from './mappers';
import type { PasswordUpdateInput } from './mappers';

export const useUpdatePassword = () =>
  useMutation({
    mutationFn: (input: PasswordUpdateInput) =>
      profileService.updatePassword(toPasswordPayload(input)),
  });

export const useUpdateProfile = () =>
  useMutation({
    mutationFn: (input: { name: string; email: string }) =>
      profileService.updateProfile(input),
  });
