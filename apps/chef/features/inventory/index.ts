/* ── Public API for features/inventory ── */

// Types
export type {
  StockItem,
  StockStats,
  LowStockAlert,
  Ingredient,
  ForecastInput,
  Forecast,
} from './types'

// Queries
export {
  useStock,
  useStockStats,
  useLowStockAlerts,
  useIngredients,
  useStockForecast,
} from './api/queries'

// Components
export { StockAlertCard } from './components/stock-alert'
