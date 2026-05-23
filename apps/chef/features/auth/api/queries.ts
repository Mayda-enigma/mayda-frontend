import { useQuery } from '@tanstack/react-query';
import { authKeys } from './queryKeys';
import { authService } from './services';
import { toUser } from './mappers';

export const useCurrentUser = () =>
  useQuery({
    queryKey: authKeys.currentUser(),
    queryFn: authService.me,
    select: (dto) => toUser(dto),
    retry: false,
    staleTime: 5 * 60_000,
  });
