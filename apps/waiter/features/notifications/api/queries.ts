import { useQuery } from '@tanstack/react-query'
import { notificationKeys } from './queryKeys'
import { notificationService } from './services'
import { toNotification } from './mappers'
import type { Notification } from '../types'

export const useNotifications = (unreadOnly = false) =>
  useQuery<Notification[]>({
    queryKey: notificationKeys.list(unreadOnly),
    queryFn: async () => {
      const dtos = await notificationService.list(unreadOnly)
      return dtos.map(toNotification)
    },
    refetchInterval: 15_000,
  })
