import { useQuery } from '@tanstack/react-query'
import { notificationKeys } from './queryKeys'
import { notificationService } from './services'
import { toNotificationList } from './mappers'

export const useNotifications = () =>
  useQuery({
    queryKey: notificationKeys.list(),
    queryFn: () => notificationService.list(),
    select: toNotificationList,
  })
