export interface Notification {
  id: number
  type: string
  title: string
  body: string
  metadata: Record<string, unknown> | null
  isRead: boolean
  createdAt: string
}

export interface NotificationDto {
  id: number
  userId: number
  type: string
  title: string
  body: string
  metadata: Record<string, unknown> | null
  isRead: boolean
  createdAt: string
}
