export interface NotificationItem {
  id: number
  type: string
  title: string
  message: string
  time: string
  read: boolean
  priority: string
  category: string
}

export interface NotificationDto {
  id: number
  userId: number
  type: string
  title: string
  body: string
  _metadata: Record<string, string> | null
  isRead: boolean
  createdAt: string
}
