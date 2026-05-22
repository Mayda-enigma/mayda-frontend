import { Fish, Carrot, Milk, Wheat, Speaker as Pepper, Package, Apple, Beef, Egg, Droplets } from "lucide-react"

export interface IngredientIcon {
  icon: any
  color: string
  bgColor: string
  image?: string
}

export function getIngredientIcon(name: string, category: string): IngredientIcon {
  const lowerName = name.toLowerCase()

  // Specific ingredient mappings
  if (lowerName.includes("salmon") || lowerName.includes("fish")) {
    return { icon: Fish, color: "text-blue-600", bgColor: "bg-blue-100" }
  }
  if (lowerName.includes("tomato")) {
    return { icon: Apple, color: "text-red-600", bgColor: "bg-red-100" }
  }
  if (lowerName.includes("cheese") || lowerName.includes("mozzarella")) {
    return { icon: Milk, color: "text-yellow-600", bgColor: "bg-yellow-100" }
  }
  if (lowerName.includes("oil") || lowerName.includes("olive")) {
    return { icon: Droplets, color: "text-green-600", bgColor: "bg-green-100" }
  }
  if (lowerName.includes("beef") || lowerName.includes("meat")) {
    return { icon: Beef, color: "text-red-700", bgColor: "bg-red-100" }
  }
  if (lowerName.includes("egg")) {
    return { icon: Egg, color: "text-yellow-700", bgColor: "bg-yellow-100" }
  }

  // Category-based fallbacks
  switch (category) {
    case "protein":
      return { icon: Fish, color: "text-red-600", bgColor: "bg-red-100" }
    case "vegetable":
      return { icon: Carrot, color: "text-green-600", bgColor: "bg-green-100" }
    case "dairy":
      return { icon: Milk, color: "text-blue-600", bgColor: "bg-blue-100" }
    case "grain":
      return { icon: Wheat, color: "text-yellow-600", bgColor: "bg-yellow-100" }
    case "spice":
      return { icon: Pepper, color: "text-orange-600", bgColor: "bg-orange-100" }
    default:
      return { icon: Package, color: "text-gray-600", bgColor: "bg-gray-100" }
  }
}

export function hasIngredientImage(name: string): boolean {
  // For now, we'll use icons instead of images
  // This can be extended later to check for actual ingredient images
  return false
}
