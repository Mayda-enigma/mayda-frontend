import type { MenuItemDto, MenuItem } from "@/features/menu/types"

export function toMenuItem(dto: MenuItemDto): MenuItem {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description,
    price: typeof dto.price === "string" ? parseFloat(dto.price) : dto.price,
    category: dto.category,
    image: dto.image,
    dietary: dto.dietary,
    ingredients: dto.ingredients,
    allergens: dto.allergens,
    popular: dto.popular,
  }
}

export function toMenuItems(dtos: MenuItemDto[]): MenuItem[] {
  return dtos.map(toMenuItem)
}
