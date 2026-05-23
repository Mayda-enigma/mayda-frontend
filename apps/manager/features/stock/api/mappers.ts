import type {
  InventoryItemDto,
  RestockOrderInput,
  StockForecast,
  StockForecastDto,
  StockItem,
  StockStatus,
  ThresholdUpdateInput,
} from '../types'

const getStatus = (
  currentStock: number,
  minimumStock: number,
  isLowStock: boolean,
): StockStatus => {
  if (minimumStock <= 0) {
    return currentStock <= 0 ? 'critical' : 'good'
  }

  if (currentStock <= minimumStock * 0.5) {
    return 'critical'
  }

  if (isLowStock || currentStock <= minimumStock) {
    return 'low'
  }

  return 'good'
}

const getNumberCandidate = (
  value: unknown,
  keys: string[],
): number | null => {
  if (!value || typeof value !== 'object') {
    return null
  }

  const record = value as Record<string, unknown>
  for (const key of keys) {
    const candidate = record[key]
    if (typeof candidate === 'number' && Number.isFinite(candidate)) {
      return candidate
    }
    if (typeof candidate === 'string') {
      const parsed = Number(candidate)
      if (Number.isFinite(parsed)) {
        return parsed
      }
    }
  }

  return null
}

const getStringCandidate = (
  value: unknown,
  keys: string[],
): string | null => {
  if (!value || typeof value !== 'object') {
    return null
  }

  const record = value as Record<string, unknown>
  for (const key of keys) {
    const candidate = record[key]
    if (typeof candidate === 'string' && candidate.trim().length > 0) {
      return candidate.trim()
    }
  }

  return null
}

const getDetails = (value: unknown): string[] => {
  if (!value || typeof value !== 'object') {
    return []
  }

  const record = value as Record<string, unknown>
  return Object.entries(record)
    .filter(([, entry]) => ['string', 'number', 'boolean'].includes(typeof entry))
    .slice(0, 4)
    .map(([key, entry]) => `${key}: ${String(entry)}`)
}

export const toStockItem = (dto: InventoryItemDto): StockItem => {
  const thresholdCoverage =
    dto.minimumStock > 0 ? (dto.currentStock / dto.minimumStock) * 100 : 100

  return {
    id: String(dto.id),
    restaurantId: dto.restaurantId,
    name: dto.name,
    description: dto.description ?? 'No description provided',
    category: dto.category,
    unit: dto.unit,
    currentStock: dto.currentStock,
    minimumStock: dto.minimumStock,
    unitPrice: dto.unitPrice,
    totalValue: dto.totalValue,
    supplier: dto.supplier ?? 'No supplier',
    location: dto.location ?? 'No location',
    expiryDate: dto.expiryDate,
    isActive: dto.isActive,
    isLowStock: dto.isLowStock,
    status: getStatus(dto.currentStock, dto.minimumStock, dto.isLowStock),
    thresholdCoverage: Math.max(0, Math.min(200, thresholdCoverage)),
    shortage: Math.max(dto.minimumStock - dto.currentStock, 0),
  }
}

export const toStockItems = (dtos: InventoryItemDto[]): StockItem[] =>
  dtos.map(toStockItem)

export const toStockForecast = (
  dto: StockForecastDto,
  item: string,
  date: string,
): StockForecast => {
  const raw = dto.forecast
  const predictedDemand = getNumberCandidate(raw, [
    'predictedDemand',
    'predicted_demand',
    'forecastedDemand',
    'demand',
    'quantity',
  ])
  const recommendedOrderQuantity = getNumberCandidate(raw, [
    'recommendedOrderQuantity',
    'recommended_order_quantity',
    'suggestedOrder',
    'suggested_order',
    'restockQuantity',
    'restock_quantity',
  ])
  const summary =
    getStringCandidate(raw, ['summary', 'recommendation', 'message', 'note']) ??
    `Forecast ready for ${item}.`

  return {
    item,
    date,
    summary,
    predictedDemand,
    recommendedOrderQuantity,
    confidence: getStringCandidate(raw, ['confidence', 'confidenceLevel']),
    urgency: getStringCandidate(raw, ['urgency', 'severity', 'priority']),
    details: getDetails(raw),
    raw,
  }
}

export const toThresholdUpdateDto = (input: ThresholdUpdateInput) => ({
  minimumStock: input.minimumStock,
})

export const toRestockOrderDto = (input: RestockOrderInput) => ({
  itemId: Number(input.itemId),
  quantityChange: input.quantity,
  reason: input.reason.trim(),
  notes: input.notes.trim() || undefined,
})
