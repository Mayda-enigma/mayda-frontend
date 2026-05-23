export type StockStatus = 'critical' | 'low' | 'good'

export interface InventoryItemDto {
  id: number
  restaurantId: number
  name: string
  description: string | null
  category: string
  unit: string
  currentStock: number
  minimumStock: number
  unitPrice: number
  totalValue: number
  supplier: string | null
  location: string | null
  expiryDate: string | null
  isActive: boolean
  isLowStock: boolean
  createdAt: string
  updatedAt: string
}

export interface StockItem {
  id: string
  restaurantId: number
  name: string
  description: string
  category: string
  unit: string
  currentStock: number
  minimumStock: number
  unitPrice: number
  totalValue: number
  supplier: string
  location: string
  expiryDate: string | null
  isActive: boolean
  isLowStock: boolean
  status: StockStatus
  thresholdCoverage: number
  shortage: number
}

export interface StockForecastRequestDto {
  item: string
  date: string
  weather?: string
  specialEvent?: string
}

export interface StockForecastDto {
  forecast: unknown
}

export interface StockForecast {
  item: string
  date: string
  summary: string
  predictedDemand: number | null
  recommendedOrderQuantity: number | null
  confidence: string | null
  urgency: string | null
  details: string[]
  raw: unknown
}

export interface ThresholdUpdateInput {
  id: string
  minimumStock: number
}

export interface RestockOrderInput {
  itemId: string
  quantity: number
  reason: string
  notes: string
}

export interface InventoryItemUpdateDto {
  minimumStock?: number
}

export interface InventoryStockUpdateDto {
  itemId: number
  quantityChange: number
  reason: string
  notes?: string
}

export interface InventoryStockUpdateResponseDto {
  success: boolean
  previousStock: number
  newStock: number
  quantityChanged: number
  message: string
}
