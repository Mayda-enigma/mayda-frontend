"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { useCart } from "@/components/cart-context"
import { X, Plus, Minus, Heart, Leaf, Wheat, AlertTriangle } from "lucide-react"

interface MenuItem {
  id: string
  name: string
  description: string
  price: number
  category: string
  image: string
  dietary: string[]
  ingredients: string[]
  allergens: string[]
  popular?: boolean
}

interface DishDetailModalProps {
  dish: MenuItem | null
  isOpen: boolean
  onClose: () => void
}

const dietaryIcons = {
  vegetarian: { icon: Leaf, color: "text-restaurant-green" },
  vegan: { icon: Heart, color: "text-restaurant-green" },
  "gluten-free": { icon: Wheat, color: "text-amber-600" },
  halal: { icon: Heart, color: "text-blue-600" },
}

export function DishDetailModal({ dish, isOpen, onClose }: DishDetailModalProps) {
  const { dispatch } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [specialInstructions, setSpecialInstructions] = useState("")

  if (!isOpen || !dish) return null

  const addToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        image: dish.image,
        quantity,
        specialInstructions: specialInstructions.trim() || undefined,
      },
    })
    dispatch({ type: "OPEN_CART" })
    onClose()
    setQuantity(1)
    setSpecialInstructions("")
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in-0 duration-300" onClick={onClose} />

      <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-background rounded-xl z-50 overflow-hidden flex flex-col max-w-2xl mx-auto animate-in zoom-in-95 slide-in-from-bottom-4 duration-300">
        {/* Content - Now includes image in scrollable area */}
        <div className="flex-1 overflow-y-auto">
          {/* Image Header */}
          <div className="relative overflow-hidden">
            <img
              src={dish.image || "/placeholder.svg"}
              alt={dish.name}
              className="w-full h-48 md:h-64 object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 bg-white/90 hover:bg-white text-black hover:scale-110 transition-all duration-200 hover:shadow-lg"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </Button>

            {dish.popular && (
              <Badge className="absolute top-4 left-4 restaurant-gradient text-white animate-bounce">Popular</Badge>
            )}

            <div className="absolute bottom-4 right-4 flex gap-2">
              {dish.dietary.map((diet, index) => {
                const dietInfo = dietaryIcons[diet as keyof typeof dietaryIcons]
                if (!dietInfo) return null
                const Icon = dietInfo.icon
                return (
                  <div
                    key={diet}
                    className="w-8 h-8 bg-white/90 rounded-full flex items-center justify-center hover:scale-110 hover:bg-white transition-all duration-200 hover:shadow-md"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <Icon className={`w-4 h-4 ${dietInfo.color}`} />
                  </div>
                )
              })}
            </div>
          </div>

          {/* Content Details */}
          <div className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-2xl font-bold mb-2 animate-in slide-in-from-left-4 duration-500">{dish.name}</h2>
                <p className="text-muted-foreground mb-3 animate-in slide-in-from-left-4 duration-500 delay-100">
                  {dish.description}
                </p>
              </div>
              <span className="text-2xl font-bold text-primary ml-4 animate-in slide-in-from-right-4 duration-500 hover:scale-110 transition-transform">
                ${dish.price.toFixed(2)}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {dish.dietary.map((diet, index) => (
                <Badge
                  key={diet}
                  variant="outline"
                  className="capitalize hover:scale-105 transition-transform duration-200 animate-in fade-in-0 slide-in-from-bottom-2 duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {diet.replace("-", " ")}
                </Badge>
              ))}
            </div>

            <Card className="mb-4 hover:shadow-md transition-shadow duration-200 animate-in slide-in-from-bottom-4 duration-500 delay-200">
              <CardContent className="p-4">
                <h3 className="font-semibold mb-2">Ingredients</h3>
                <p className="text-sm text-muted-foreground">{dish.ingredients.join(", ")}</p>
              </CardContent>
            </Card>

            {dish.allergens.length > 0 && (
              <Card className="mb-4 border-amber-200 bg-amber-50 hover:shadow-md transition-shadow duration-200 animate-in slide-in-from-bottom-4 duration-500 delay-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600 animate-pulse" />
                    <h3 className="font-semibold text-amber-800">Allergen Information</h3>
                  </div>
                  <p className="text-sm text-amber-700">Contains: {dish.allergens.join(", ")}</p>
                </CardContent>
              </Card>
            )}

            <div className="mb-6 animate-in slide-in-from-bottom-4 duration-500 delay-400">
              <label className="block text-sm font-medium mb-2">Special Instructions (Optional)</label>
              <Textarea
                placeholder="Any dietary restrictions, cooking preferences, or special requests..."
                value={specialInstructions}
                onChange={(e) => setSpecialInstructions(e.target.value)}
                className="resize-none focus:ring-2 focus:ring-primary/20 transition-all duration-200 hover:shadow-sm"
                rows={3}
              />
            </div>
          </div>
        </div>

        <div className="border-t border-border p-6 bg-background animate-in slide-in-from-bottom-4 duration-500 delay-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="font-medium">Quantity:</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 bg-transparent hover:scale-110 hover:bg-primary hover:text-white transition-all duration-200"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="w-12 text-center font-semibold text-lg">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-10 h-10 p-0 bg-transparent hover:scale-110 hover:bg-primary hover:text-white transition-all duration-200"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Total</p>
              <p className="text-xl font-bold text-primary hover:scale-110 transition-transform duration-200">
                ${(dish.price * quantity).toFixed(2)}
              </p>
            </div>
          </div>

          <Button
            className="w-full restaurant-gradient text-white hover:opacity-90 hover:scale-105 transition-all duration-200 hover:shadow-lg"
            size="lg"
            onClick={addToCart}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add to Order
          </Button>
        </div>
      </div>
    </>
  )
}
