import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { FilterState, SortOption, SpiceLevel } from './types'
import { defaultFilters } from './types'

interface FilterActions {
  toggleDietary: (id: string) => void
  toggleCuisine: (id: string) => void
  toggleSpice: (level: SpiceLevel) => void
  setPriceRange: (range: [number, number]) => void
  setPrepTime: (range: [number, number]) => void
  setPopularOnly: (value: boolean) => void
  setSortBy: (value: SortOption) => void
  clearAll: () => void
  activeCount: () => number
}

export const useFilterStore = create<FilterState & FilterActions>()(
  persist(
    (set, get) => ({
      ...defaultFilters,

      toggleDietary: (id) =>
        set((s) => ({
          dietary: s.dietary.includes(id)
            ? s.dietary.filter((d) => d !== id)
            : [...s.dietary, id],
        })),

      toggleCuisine: (id) =>
        set((s) => ({
          cuisines: s.cuisines.includes(id)
            ? s.cuisines.filter((c) => c !== id)
            : [...s.cuisines, id],
        })),

      toggleSpice: (level) =>
        set((s) => ({
          spice: s.spice.includes(level)
            ? s.spice.filter((l) => l !== level)
            : [...s.spice, level],
        })),

      setPriceRange: (range) => set({ priceRange: range }),
      setPrepTime: (range) => set({ prepTime: range }),
      setPopularOnly: (value) => set({ popularOnly: value }),
      setSortBy: (value) => set({ sortBy: value }),
      clearAll: () => set(defaultFilters),

      activeCount: () => {
        const s = get()
        return (
          s.dietary.length +
          s.cuisines.length +
          s.spice.length +
          (s.popularOnly ? 1 : 0) +
          (s.sortBy !== 'recommended' ? 1 : 0)
        )
      },
    }),
    {
      name: 'mayda_filters',
    },
  ),
)
