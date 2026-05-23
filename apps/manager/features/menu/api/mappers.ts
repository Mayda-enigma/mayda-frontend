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
  categoryId: category.id,
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
  categoryId: input.categoryId,
  name: input.name.trim(),
  description: input.description.trim(),
  price: input.price,
  image: input.imageUrl.trim() || null,
  isAvailable: input.isAvailable,
  quantity: 0,
  preparationTime: input.preparationTime,
  popularity: 0,
  displayOrder: 0,
})

