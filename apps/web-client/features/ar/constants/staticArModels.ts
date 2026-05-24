import type { ArDishLookupInput, StaticArModel } from '../types'

export const STATIC_AR_MODELS: (StaticArModel & { aliases?: string[] })[] = [
  {
    dishName: 'Chourba',
    src: '/AR/chourba.glb',
    alt: 'Chourba Djedj',
  },
  {
    dishName: 'Bourek',
    aliases: ['Bourak'],
    src: '/AR/Bourak Fixed 2.glb',
    alt: 'Bourek',
  },
  {
    dishName: 'Thé à la Menthe',
    src: '/AR/Tememon Tea Cup.glb',
    alt: 'Thé à la Menthe',
  },
]

const normalizeDishName = (name: string) =>
  name
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()

export const getStaticArModelForDish = (dish: ArDishLookupInput) =>
  STATIC_AR_MODELS.find((model) => {
    if (model.dishId && model.dishId === dish.id) {
      return true
    }

    const dishName = normalizeDishName(dish.name)
    const names = [model.dishName, ...(model.aliases ?? [])].map(normalizeDishName)
    return names.some((n) => dishName.includes(n) || n.includes(dishName))
  })

export const hasStaticArModelForDish = (dish: ArDishLookupInput) =>
  Boolean(getStaticArModelForDish(dish))
