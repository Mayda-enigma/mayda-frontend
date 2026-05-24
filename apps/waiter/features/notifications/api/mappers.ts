import type { Notification, NotificationDto } from '../types'

export const toNotification = (dto: NotificationDto): Notification => ({
  id: dto.id,
  type: dto.type,
  title: dto.title,
  body: dto.body,
  metadata: dto.metadata,
  isRead: dto.isRead,
  createdAt: dto.createdAt,
})
