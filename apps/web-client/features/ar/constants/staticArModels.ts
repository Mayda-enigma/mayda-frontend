import type { ArDishLookupInput, StaticArModel } from '../types'

// Temporary demo registry: backend menu DTOs do not expose AR model URLs yet.
// Prefer stable dish IDs when they are available; name matching is fragile.
export const STATIC_AR_MODELS: StaticArModel[] = [
  {
    dishName: 'Gourmet Burger',
    src: '/models/demo/burger_merged.glb',
    alt: 'Gourmet Burger',
  },
  {
    dishName: 'Croissant',
    src: '/models/demo/croissant.glb',
    alt: 'Croissant',
  },
]

const normalizeDishName = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

export const getStaticArModelForDish = (dish: ArDishLookupInput) =>
  STATIC_AR_MODELS.find((model) => {
    if (model.dishId && model.dishId === dish.id) {
      return true
    }

    return normalizeDishName(model.dishName) === normalizeDishName(dish.name)
  })

export const hasStaticArModelForDish = (dish: ArDishLookupInput) =>
  Boolean(getStaticArModelForDish(dish))
