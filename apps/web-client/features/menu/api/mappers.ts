import type { MenuItemDto, MenuItem } from '../types';

export const toMenuItem = (dto: MenuItemDto): MenuItem => ({
  id: dto.id,
  name: dto.name,
  description: dto.description,
  price: dto.price_cents / 100,
  category: dto.category,
  image: dto.image_url,
  dietary: dto.dietary_tags,
  ingredients: dto.ingredients,
  allergens: dto.allergens,
  popular: dto.is_popular,
});

export const toMenuItems = (dtos: MenuItemDto[]): MenuItem[] =>
  dtos.map(toMenuItem);
