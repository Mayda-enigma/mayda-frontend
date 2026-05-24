import type { NotificationDto, NotificationItem } from './types'

function timeAgo(dateStr: string): string {
  const now = Date.now()
  const then = new Date(dateStr).getTime()
  const diff = now - then
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'just now'
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  const days = Math.floor(hours / 24)
  return `${days} day${days > 1 ? 's' : ''} ago`
}

function inferPriority(notification: NotificationDto): string {
  if (notification.type === 'alert' || notification.type === 'warning') return 'high'
  if (notification.type === 'info') return 'medium'
  return 'low'
}

function inferCategory(type: string): string {
  const catMap: Record<string, string> = {
    alert: 'inventory',
    warning: 'equipment',
    info: 'orders',
    success: 'sales',
  }
  return catMap[type] ?? 'general'
}

export function toNotificationItem(dto: NotificationDto): NotificationItem {
  return {
    id: dto.id,
    type: dto.type,
    title: dto.title,
    message: dto.body,
    time: timeAgo(dto.createdAt),
    read: dto.isRead,
    priority: inferPriority(dto),
    category: inferCategory(dto.type),
  }
}

export function toNotificationList(dtos: NotificationDto[]): NotificationItem[] {
  return dtos.map(toNotificationItem)
}
