import type { MenuItemDto, MenuItem, CreateMenuItemInput, CreateMenuItemDto } from '../types';

export const toMenuItem = (dto: MenuItemDto): MenuItem => ({
  id: dto.id,
  name: dto.name,
  price: Number(dto.price_cents) / 100,
  imageUrl: dto.image_url ?? '/placeholder.png',
  dietary: dto.dietary_tags ?? [],
  isAvailable: dto.is_available,
});

export const toMenuItems = (dtos: MenuItemDto[]): MenuItem[] =>
  dtos.map(toMenuItem);

export const toCreateMenuItemDto = (input: CreateMenuItemInput): CreateMenuItemDto => ({
  name: input.name,
  price_cents: Math.round(input.price * 100),
  dietary_tags: input.dietary,
});
