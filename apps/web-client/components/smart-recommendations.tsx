"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/components/cart-context"
import { Sparkles, Clock, Calendar, TrendingUp, Plus, X } from "lucide-react"

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

interface Recommendation {
  id: string
  type: "time-based" | "day-based" | "trending" | "pairing" | "seasonal"
  title: string
  subtitle: string
  items: MenuItem[]
  icon: React.ComponentType<{ className?: string }>
  priority: number
}

interface SmartRecommendationsProps {
  menuItems: MenuItem[]
  cartItems: any[]
}

export function SmartRecommendations({ menuItems, cartItems }: SmartRecommendationsProps) {
  const { dispatch } = useCart()
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [dismissedRecommendations, setDismissedRecommendations] = useState<string[]>([])

  useEffect(() => {
    const generateRecommendations = () => {
      const now = new Date()
      const hour = now.getHours()
      const day = now.getDay() // 0 = Sunday, 5 = Friday
      const isWeekend = day === 0 || day === 6
      const isFriday = day === 5

      const newRecommendations: Recommendation[] = []

      // Time-based recommendations
      if (hour >= 11 && hour < 15) {
        // Lunch time
        const lunchItems = menuItems.filter(
          (item) =>
            item.category === "mains" &&
            (item.name.includes("Bowl") || item.name.includes("Salad") || item.name.includes("Light")),
        )
        if (lunchItems.length > 0) {
          newRecommendations.push({
            id: "lunch-special",
            type: "time-based",
            title: "Perfect for Lunch",
            subtitle: "Light and satisfying midday meals",
            items: lunchItems.slice(0, 2),
            icon: Clock,
            priority: 1,
          })
        }
      } else if (hour >= 17 && hour < 22) {
        // Dinner time
        const dinnerItems = menuItems.filter((item) => item.category === "mains" && (item.popular || item.price > 25))
        if (dinnerItems.length > 0) {
          newRecommendations.push({
            id: "dinner-special",
            type: "time-based",
            title: "Chef's Dinner Recommendations",
            subtitle: "Premium dishes for your evening meal",
            items: dinnerItems.slice(0, 2),
            icon: Sparkles,
            priority: 1,
          })
        }
      }

      // Day-based recommendations
      if (isFriday) {
        const couscousItems = menuItems.filter(
          (item) =>
            item.name.toLowerCase().includes("lamb") ||
            item.name.toLowerCase().includes("tagine") ||
            item.dietary.includes("halal"),
        )
        if (couscousItems.length > 0) {
          newRecommendations.push({
            id: "friday-special",
            type: "day-based",
            title: "It's Friday!",
            subtitle: "Traditional Friday favorites",
            items: couscousItems.slice(0, 2),
            icon: Calendar,
            priority: 2,
          })
        }
      }

      // Trending items
      const trendingItems = menuItems.filter((item) => item.popular)
      if (trendingItems.length > 0) {
        newRecommendations.push({
          id: "trending",
          type: "trending",
          title: "Trending Now",
          subtitle: "Most popular dishes today",
          items: trendingItems.slice(0, 3),
          icon: TrendingUp,
          priority: 3,
        })
      }

      // Pairing recommendations based on cart
      if (cartItems.length > 0) {
        const cartItemIds = cartItems.map((item) => item.id)
        const hasMainCourse = cartItems.some(
          (item) => menuItems.find((menuItem) => menuItem.id === item.id)?.category === "mains",
        )
        const hasDrinks = cartItems.some(
          (item) => menuItems.find((menuItem) => menuItem.id === item.id)?.category === "drinks",
        )

        if (hasMainCourse && !hasDrinks) {
          const drinkItems = menuItems.filter((item) => item.category === "drinks" && !cartItemIds.includes(item.id))
          if (drinkItems.length > 0) {
            newRecommendations.push({
              id: "drink-pairing",
              type: "pairing",
              title: "Perfect Pairings",
              subtitle: "Drinks that complement your meal",
              items: drinkItems.slice(0, 2),
              icon: Sparkles,
              priority: 1,
            })
          }
        }

        if (!cartItems.some((item) => menuItems.find((menuItem) => menuItem.id === item.id)?.category === "desserts")) {
          const dessertItems = menuItems.filter(
            (item) => item.category === "desserts" && !cartItemIds.includes(item.id),
          )
          if (dessertItems.length > 0) {
            newRecommendations.push({
              id: "dessert-pairing",
              type: "pairing",
              title: "Sweet Endings",
              subtitle: "Perfect desserts to complete your meal",
              items: dessertItems.slice(0, 2),
              icon: Sparkles,
              priority: 2,
            })
          }
        }
      }

      // Seasonal recommendations (simulated)
      const seasonalItems = menuItems.filter(
        (item) => item.name.includes("Fresh") || item.dietary.includes("vegan") || item.name.includes("Mediterranean"),
      )
      if (seasonalItems.length > 0) {
        newRecommendations.push({
          id: "seasonal",
          type: "seasonal",
          title: "Fresh & Seasonal",
          subtitle: "Made with the finest seasonal ingredients",
          items: seasonalItems.slice(0, 2),
          icon: Sparkles,
          priority: 4,
        })
      }

      // Sort by priority and filter out dismissed
      const filteredRecommendations = newRecommendations
        .filter((rec) => !dismissedRecommendations.includes(rec.id))
        .sort((a, b) => a.priority - b.priority)
        .slice(0, 3) // Show max 3 recommendation sections

      setRecommendations(filteredRecommendations)
    }

    generateRecommendations()
  }, [menuItems, cartItems, dismissedRecommendations])

  const addToCart = (item: MenuItem) => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        image: item.image,
      },
    })
  }

  const dismissRecommendation = (recommendationId: string) => {
    setDismissedRecommendations((prev) => [...prev, recommendationId])
  }

  if (recommendations.length === 0) return null

  return (
    <div className="space-y-4">
      {recommendations.map((recommendation) => {
        const Icon = recommendation.icon
        return (
          <Card
            key={recommendation.id}
            className="overflow-hidden border-primary/20 bg-gradient-to-r from-primary/5 to-transparent"
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 restaurant-gradient rounded-full flex items-center justify-center">
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{recommendation.title}</h3>
                    <p className="text-sm text-muted-foreground">{recommendation.subtitle}</p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-1 h-auto text-muted-foreground hover:text-foreground"
                  onClick={() => dismissRecommendation(recommendation.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {recommendation.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                      <p className="text-xs text-muted-foreground line-clamp-1">{item.description}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-sm font-semibold text-primary">${item.price}</span>
                        <Button
                          size="sm"
                          className="h-7 px-2 text-xs restaurant-gradient text-white hover:opacity-90"
                          onClick={() => addToCart(item)}
                        >
                          <Plus className="w-3 h-3 mr-1" />
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {recommendation.type === "pairing" && (
                <div className="mt-3 p-2 bg-amber-50 rounded-md border border-amber-200">
                  <p className="text-xs text-amber-800 text-center">
                    <Sparkles className="w-3 h-3 inline mr-1" />
                    AI-powered recommendation based on your current order
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
