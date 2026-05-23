import type {
  CategoryDto,
  CreateMenuItemDto,
  CreateMenuItemInput,
  DishDto,
  MenuDto,
  MenuItem,
} from '../types'

const toMenuItem = (dish: DishDto, category: CategoryDto): MenuItem => ({
  id: String(dish.id),
  name: dish.name,
  description: dish.description,
  price: dish.price,
  category: category.name,
  image: dish.image ?? '/placeholder.svg',
  isAvailable: dish.isAvailable,
  preparationTime: dish.preparationTime,
  popularity: dish.popularity,
  quantity: dish.quantity,
})

export const toMenuItems = (menus: MenuDto[]): MenuItem[] =>
  menus.flatMap((menu) =>
    menu.categories.flatMap((category) =>
      category.dishes.map((dish) => toMenuItem(dish, category)),
    ),
  )

export const toCreateMenuItemDto = (
  input: CreateMenuItemInput,
): CreateMenuItemDto => ({
  name: input.name.trim(),
  description: input.description.trim(),
  category_name: input.category.trim(),
  price: input.price,
  image_url: input.imageUrl.trim() || null,
  preparation_time: input.preparationTime,
  is_available: input.isAvailable,
})

