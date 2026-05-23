import type {
  InventoryItemDto,
  StockItem,
  InventoryStatsDto,
  StockStats,
  LowStockAlertDto,
  LowStockAlert,
  IngredientDto,
  Ingredient,
  ForecastDto,
  Forecast,
} from '../types'

/* ── Inventory items ── */

export const toStockItem = (dto: InventoryItemDto): StockItem => ({
  id: String(dto.id),
  name: dto.name,
  category: dto.category,
  unit: dto.unit,
  currentStock: dto.currentStock,
  minimumStock: dto.minimumStock,
  unitPrice: dto.unitPrice,
  totalValue: dto.totalValue,
  supplier: dto.supplier,
  location: dto.location,
  expiryDate: dto.expiryDate ? new Date(dto.expiryDate) : null,
  isLowStock: dto.isLowStock,
  restaurantId: dto.restaurantId,
})

export const toStockItems = (dtos: InventoryItemDto[]): StockItem[] =>
  dtos.map(toStockItem)

/* ── Stats ── */

export const toStockStats = (dto: InventoryStatsDto): StockStats => ({
  restaurantId: dto.restaurantId,
  restaurantName: dto.restaurantName,
  totalItems: dto.totalItems,
  activeItems: dto.activeItems,
  lowStockItems: dto.lowStockItems,
  totalValue: dto.totalValue,
  averageItemValue: dto.averageItemValue,
  expiringSoonItems: dto.expiringSoonItems,
  categoriesCount: dto.categoriesCount,
  suppliersCount: dto.suppliersCount,
})

/* ── Low-stock alerts ── */

export const toLowStockAlert = (dto: LowStockAlertDto): LowStockAlert => ({
  id: String(dto.id),
  name: dto.name,
  category: dto.category,
  currentStock: dto.currentStock,
  minimumStock: dto.minimumStock,
  unit: dto.unit,
  supplier: dto.supplier,
})

export const toLowStockAlerts = (dtos: LowStockAlertDto[]): LowStockAlert[] =>
  dtos.map(toLowStockAlert)

/* ── Ingredients ── */

export const toIngredient = (dto: IngredientDto): Ingredient => ({
  id: String(dto.id),
  name: dto.name,
  description: dto.description,
  allergenInfo: dto.allergenInfo,
  category: dto.category,
  isVegetarian: dto.isVegetarian,
  isVegan: dto.isVegan,
  isGlutenFree: dto.isGlutenFree,
  isDairyFree: dto.isDairyFree,
  dishCount: dto.dishCount,
})

export const toIngredients = (dtos: IngredientDto[]): Ingredient[] =>
  dtos.map(toIngredient)

/* ── AI forecast ── */

export const toForecast = (dto: ForecastDto): Forecast => ({
  data: dto.forecast,
})
