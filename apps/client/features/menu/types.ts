export interface MenuItemDto {
  id: string
  name: string
  description: string
  price: string | number
  category: string
  image: string
  dietary: string[]
  ingredients: string[]
  allergens: string[]
  popular?: boolean
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  dietary: string[]
  ingredients: string[]
  allergens: string[]
  popular?: boolean
}
