import { apiClient } from '@/shared/api/client'
import type { NotificationDto } from '../types'

export const notificationService = {
  list: (unreadOnly = false) =>
    apiClient<NotificationDto[]>(`/notifications/${unreadOnly ? '?unreadOnly=true' : ''}`),

  markRead: (id: number) =>
    apiClient<NotificationDto>(`/notifications/${id}/read`, { method: 'PATCH' }),

  markAllRead: () =>
    apiClient<{ success: boolean }>('/notifications/read-all', { method: 'POST' }),
}
