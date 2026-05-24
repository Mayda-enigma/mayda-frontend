import { apiClient } from '@/shared/api/client'
import type { NotificationDto } from './types'

export const notificationService = {
  list: () =>
    apiClient<NotificationDto[]>('/notifications/?unreadOnly=false'),
}
