export interface DishDto {
  id: number
  name: string
  description: string
  price: number
  image: string | null
  isAvailable: boolean
  quantity: number
  preparationTime: number
  popularity: number
}

export interface CategoryDto {
  id: number
  name: string
  description: string
  image: string | null
  isActive: boolean
  displayOrder: number
  dishes: DishDto[]
}

export interface MenuDto {
  id: number
  name: string
  description: string
  isActive: boolean
  displayOrder: number
  categories: CategoryDto[]
}

export interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  categoryId: number
  image: string
  isAvailable: boolean
  preparationTime: number
  popularity: number
  quantity: number
}

export interface CreateMenuItemInput {
  name: string
  description: string
  categoryId: number
  price: number
  imageUrl: string
  preparationTime: number
  isAvailable: boolean
}

export interface CreateMenuItemDto {
  categoryId: number
  name: string
  description: string
  price: number
  image: string | null
  isAvailable: boolean
  quantity: number
  preparationTime: number
  popularity: number
  displayOrder: number
}

export interface ToggleAvailabilityInput {
  id: string
}

