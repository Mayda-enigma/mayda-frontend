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
  image: string
  isAvailable: boolean
  preparationTime: number
  popularity: number
  quantity: number
}

export interface CreateMenuItemInput {
  name: string
  description: string
  category: string
  price: number
  imageUrl: string
  preparationTime: number
  isAvailable: boolean
}

export interface CreateMenuItemDto {
  name: string
  description: string
  category_name: string
  price: number
  image_url: string | null
  preparation_time: number
  is_available: boolean
}

export interface ToggleAvailabilityInput {
  id: string
  isAvailable: boolean
}

