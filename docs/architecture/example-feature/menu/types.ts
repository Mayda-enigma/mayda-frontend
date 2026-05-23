// --- Domain Types (used across app) ---

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
  dietary: string[];
  isAvailable: boolean;
}

export interface MenuCategory {
  id: string;
  name: string;
  items: MenuItem[];
}

// --- DTO Types (API wire format) ---

export interface MenuItemDto {
  id: string;
  name: string;
  price_cents: number;
  image_url: string | null;
  dietary_tags: string[] | null;
  is_available: boolean;
}

export interface CreateMenuItemInput {
  name: string;
  price: number;
  dietary: string[];
}

export interface CreateMenuItemDto {
  name: string;
  price_cents: number;
  dietary_tags: string[];
}
