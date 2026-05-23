import { useMemo } from 'react'
import { useFilterStore } from '../store'
import type { MenuItem } from '@/features/menu'

export function useFilteredMenu(items: MenuItem[]): MenuItem[] {
  const { dietary, priceRange, prepTime, popularOnly, sortBy } = useFilterStore()

  return useMemo(() => {
    let result = items.filter((item) => {
      if (dietary.length > 0 && !dietary.some((d) => item.dietary.includes(d))) return false
      if (item.price < priceRange[0] || item.price > priceRange[1]) return false
      if (popularOnly && !item.popular) return false
      return true
    })

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price)
        break
      case 'popular':
        result = [...result].sort((a, b) => (b.popular ? 1 : 0) - (a.popular ? 1 : 0))
        break
    }

    return result
  }, [items, dietary, priceRange, prepTime, popularOnly, sortBy])
}
