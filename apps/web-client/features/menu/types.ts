export interface MenuItemDto {
  id: string;
  name: string;
  description: string;
  price_cents: number;
  category: string;
  image_url: string;
  dietary_tags: string[];
  ingredients: string[];
  allergens: string[];
  is_popular?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  dietary: string[];
  ingredients: string[];
  allergens: string[];
  popular?: boolean;
}
