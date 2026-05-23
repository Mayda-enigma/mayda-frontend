/* ─── DTOs (mirror backend response shapes exactly) ─── */

export interface InventoryItemDto {
  id: number
  restaurantId: number
  restaurant?: { name: string } | null
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

export interface InventoryStatsDto {
  restaurantId: number
  restaurantName: string
  totalItems: number
  activeItems: number
  lowStockItems: number
  totalValue: number
  averageItemValue: number
  expiringSoonItems: number
  categoriesCount: number
  suppliersCount: number
}

export interface LowStockAlertDto {
  id: number
  name: string
  category: string
  currentStock: number
  minimumStock: number
  unit: string
  supplier: string | null
  location: string | null
  expiryDate: string | null
}

export interface IngredientDto {
  id: number
  name: string
  description: string | null
  allergenInfo: string | null
  category: string
  isVegetarian: boolean
  isVegan: boolean
  isGlutenFree: boolean
  isDairyFree: boolean
  nutritionalInfo: Record<string, unknown> | null
  isActive: boolean
  createdAt: string
  updatedAt: string
  dishCount: number
}

export interface ForecastRequestDto {
  item: string
  date: string
  weather?: string | null
  specialEvent?: string | null
}

export interface ForecastDto {
  forecast: unknown
}

/* ─── Domain models ─── */

export interface StockItem {
  id: string
  name: string
  category: string
  unit: string
  currentStock: number
  minimumStock: number
  unitPrice: number
  totalValue: number
  supplier: string | null
  location: string | null
  expiryDate: Date | null
  isLowStock: boolean
  restaurantId: number
}

export interface StockStats {
  restaurantId: number
  restaurantName: string
  totalItems: number
  activeItems: number
  lowStockItems: number
  totalValue: number
  averageItemValue: number
  expiringSoonItems: number
  categoriesCount: number
  suppliersCount: number
}

export interface LowStockAlert {
  id: string
  name: string
  category: string
  currentStock: number
  minimumStock: number
  unit: string
  supplier: string | null
}

export interface Ingredient {
  id: string
  name: string
  description: string | null
  allergenInfo: string | null
  category: string
  isVegetarian: boolean
  isVegan: boolean
  isGlutenFree: boolean
  isDairyFree: boolean
  dishCount: number
}

export interface ForecastInput {
  item: string
  date: string
  weather?: string
  specialEvent?: string
}

export interface Forecast {
  data: unknown
}
