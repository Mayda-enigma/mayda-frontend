import type { MenuDto, MenuItem, DishDto } from '../types';

const toDishMenuItem = (dto: DishDto, categoryName: string): MenuItem => ({
  id: String(dto.id),
  name: dto.name,
  description: dto.description,
  price: dto.price,
  category: categoryName.toLowerCase(),
  image: dto.image ?? '/placeholder.svg',
  dietary: [],
  ingredients: [],
  allergens: [],
  popular: dto.popularity >= 4.0,
  preparationTime: dto.preparationTime,
});

export const toMenuItems = (menus: MenuDto[]): MenuItem[] =>
  menus.flatMap((menu) =>
    menu.categories.flatMap((cat) =>
      cat.dishes.map((dish) => toDishMenuItem(dish, cat.name)),
    ),
  );
