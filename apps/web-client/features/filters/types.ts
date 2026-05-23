export type SortOption = 'recommended' | 'price-low' | 'price-high' | 'popular' | 'prep-time' | 'rating'

export type SpiceLevel = 'mild' | 'medium' | 'hot' | 'very-hot'

export interface FilterState {
  dietary: string[]
  cuisines: string[]
  spice: SpiceLevel[]
  priceRange: [number, number]
  prepTime: [number, number]
  popularOnly: boolean
  sortBy: SortOption
}

export const defaultFilters: FilterState = {
  dietary: [],
  cuisines: [],
  spice: [],
  priceRange: [0, 50],
  prepTime: [0, 60],
  popularOnly: false,
  sortBy: 'recommended',
}
