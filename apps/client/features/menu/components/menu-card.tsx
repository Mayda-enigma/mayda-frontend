"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Leaf, Heart, Wheat } from "lucide-react"
import { useCart } from "@/features/cart"
import type { MenuItem } from "@/features/menu/types"

const dietaryFilters = [
  { id: "vegetarian", icon: Leaf, color: "text-restaurant-green" },
  { id: "vegan", icon: Heart, color: "text-restaurant-green" },
  { id: "gluten-free", icon: Wheat, color: "text-amber-600" },
  { id: "halal", icon: Heart, color: "text-blue-600" },
]

interface MenuCardProps {
  item: MenuItem
  index: number
  onViewDetails: (item: MenuItem) => void
}

export function MenuCard({ item, index, onViewDetails }: MenuCardProps) {
  const cart = useCart()

  const quickAdd = (e: React.MouseEvent) => {
    e.stopPropagation()
    cart.add({ id: item.id, name: item.name, price: item.price, image: item.image })
  }

  return (
    <Card
      className="overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1 hover:scale-[1.02]"
      style={{ animationDelay: `${index * 100}ms`, animation: "fadeInUp 0.6s ease-out forwards" }}
    >
      <div className="relative overflow-hidden" onClick={() => onViewDetails(item)}>
        <img
          src={item.image || "/placeholder.svg"}
          alt={item.name}
          className="w-full h-32 sm:h-40 md:h-48 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {item.popular && (
          <Badge className="absolute top-2 left-2 restaurant-gradient text-white animate-bounce">Popular</Badge>
        )}
        <div className="absolute top-2 right-2 flex gap-1">
          {item.dietary.map((diet) => {
            const filter = dietaryFilters.find((f) => f.id === diet)
            if (!filter) return null
            const Icon = filter.icon
            return (
              <div
                key={diet}
                className="w-6 h-6 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 transition-transform duration-200"
              >
                <Icon className={`w-3 h-3 ${filter.color}`} />
              </div>
            )
          })}
        </div>
      </div>

      <CardContent className="p-3 sm:p-4">
        <div className="flex justify-between items-start mb-2" onClick={() => onViewDetails(item)}>
          <h3 className="font-semibold text-sm sm:text-lg leading-tight group-hover:text-primary transition-colors duration-200">
            {item.name}
          </h3>
          <span className="text-sm sm:text-lg font-bold text-primary ml-2 group-hover:scale-110 transition-transform duration-200">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p
          className="text-muted-foreground text-xs sm:text-sm mb-2 sm:mb-3 line-clamp-2"
          onClick={() => onViewDetails(item)}
        >
          {item.description}
        </p>

        <div className="flex flex-wrap gap-1 mb-3" onClick={() => onViewDetails(item)}>
          {item.dietary.map((diet) => (
            <Badge key={diet} variant="outline" className="text-xs hover:scale-105 transition-transform duration-200">
              {diet}
            </Badge>
          ))}
        </div>

        <div className="flex gap-1 sm:gap-2">
          <Button
            className="flex-1 restaurant-gradient text-white hover:opacity-90 hover:scale-105 transition-all duration-200 hover:shadow-lg text-xs sm:text-sm py-1 sm:py-2"
            size="sm"
            onClick={() => onViewDetails(item)}
          >
            View Details
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="px-2 sm:px-3 bg-transparent hover:scale-110 hover:bg-primary hover:text-white transition-all duration-200 hover:shadow-md"
            onClick={quickAdd}
          >
            <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
