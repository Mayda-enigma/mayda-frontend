"use client"

import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Slider } from "@/shared/ui/slider"
import { ThemeToggle } from "@/components/theme-toggle"
import { BurgerMenu } from "@/components/burger-menu"
import { useFilterStore } from "@/features/filters"
import type { SpiceLevel } from "@/features/filters"
import { ArrowLeft, Leaf, Wheat, Heart, Star, Clock, DollarSign } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

const dietaryOptions = [
  { id: "vegetarian", name: "Vegetarian", icon: Leaf, color: "text-green-600" },
  { id: "vegan", name: "Vegan", icon: Heart, color: "text-green-600" },
  { id: "gluten-free", name: "Gluten Free", icon: Wheat, color: "text-amber-600" },
  { id: "halal", name: "Halal", icon: Heart, color: "text-blue-600" },
  { id: "dairy-free", name: "Dairy Free", icon: Heart, color: "text-purple-600" },
  { id: "nut-free", name: "Nut Free", icon: Heart, color: "text-orange-600" },
]

const cuisineTypes = ["Mediterranean", "Italian", "Moroccan", "French", "Asian", "American", "Healthy", "Comfort Food"]

const spiceLevels: { id: SpiceLevel; name: string; color: string }[] = [
  { id: "mild", name: "Mild", color: "bg-green-100 text-green-800" },
  { id: "medium", name: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { id: "hot", name: "Hot", color: "bg-orange-100 text-orange-800" },
  { id: "very-hot", name: "Very Hot", color: "bg-red-100 text-red-800" },
]

export default function FiltersPage() {
  const router = useRouter()
  const {
    dietary,
    cuisines,
    spice,
    priceRange,
    prepTime,
    popularOnly,
    sortBy,
    toggleDietary,
    toggleCuisine,
    toggleSpice,
    setPriceRange,
    setPrepTime,
    setPopularOnly,
    setSortBy,
    clearAll,
    activeCount,
  } = useFilterStore()

  const count = activeCount()

  return (
    <div className="min-h-dvh bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <BurgerMenu currentPage="filters" />
            <Link href="/menu" className="hidden md:block" aria-label="Back to filters">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Filters</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {count > 0 ? `${count} active filters` : "No filters applied"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Button variant="ghost" onClick={clearAll} className="text-xs sm:text-sm px-2 sm:px-3">
              Clear All
            </Button>
          </div>
        </div>
      </header>

      <div className="p-2 sm:p-3 md:p-4 space-y-3 sm:space-y-4 md:space-y-6">
        {/* Sort Options */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Star className="w-4 h-4 sm:w-5 sm:h-5" />
              Sort By
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(
                [
                  { id: "recommended", name: "Recommended" },
                  { id: "price-low", name: "Price: Low to High" },
                  { id: "price-high", name: "Price: High to Low" },
                  { id: "popular", name: "Most Popular" },
                  { id: "prep-time", name: "Prep Time" },
                  { id: "rating", name: "Highest Rated" },
                ] as const
              ).map((option) => (
                <Button
                  key={option.id}
                  variant={sortBy === option.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(option.id)}
                  className={`text-xs sm:text-sm ${sortBy === option.id ? "bg-primary text-primary-foreground" : ""}`}
                >
                  {option.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Price Range */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
              Price Range
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <Slider value={priceRange} onValueChange={(v) => setPriceRange(v as [number, number])} max={50} min={0} step={1} className="w-full" />
              <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Preparation Time */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="flex items-center gap-2 text-sm sm:text-base">
              <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
              Preparation Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <Slider value={prepTime} onValueChange={(v) => setPrepTime(v as [number, number])} max={60} min={0} step={5} className="w-full" />
              <div className="flex justify-between text-xs sm:text-sm text-muted-foreground">
                <span>{prepTime[0]} min</span>
                <span>{prepTime[1]}+ min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Dietary Preferences */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-sm sm:text-base">Dietary Preferences</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {dietaryOptions.map((option) => {
                const Icon = option.icon
                const isSelected = dietary.includes(option.id)
                return (
                  <Button
                    key={option.id}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleDietary(option.id)}
                    className={`justify-start text-xs sm:text-sm ${isSelected ? "bg-green-600 text-white" : ""}`}
                  >
                    <Icon className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
                    {option.name}
                  </Button>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Cuisine Types */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-sm sm:text-base">Cuisine Type</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-1 sm:gap-2">
              {cuisineTypes.map((cuisine) => (
                <Badge
                  key={cuisine}
                  variant={cuisines.includes(cuisine) ? "default" : "outline"}
                  className={`cursor-pointer text-xs sm:text-sm hover:scale-105 transition-transform duration-200 ${
                    cuisines.includes(cuisine) ? "bg-primary text-primary-foreground" : ""
                  }`}
                  onClick={() => toggleCuisine(cuisine)}
                >
                  {cuisine}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Spice Level */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-sm sm:text-base">Spice Level</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-2">
              {spiceLevels.map((level) => (
                <Button
                  key={level.id}
                  variant={spice.includes(level.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSpice(level.id)}
                  className={`text-xs sm:text-sm ${spice.includes(level.id) ? "bg-primary text-primary-foreground" : ""}`}
                >
                  {level.name}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Popular Items Toggle */}
        <Card>
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-sm sm:text-base">Additional Options</CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              variant={popularOnly ? "default" : "outline"}
              onClick={() => setPopularOnly(!popularOnly)}
              className={`w-full text-xs sm:text-sm ${popularOnly ? "bg-primary text-primary-foreground" : ""}`}
            >
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Show Popular Items Only
            </Button>
          </CardContent>
        </Card>

        {/* Apply Filters Button */}
        <div className="sticky bottom-4">
          <Button
            onClick={() => router.push("/menu")}
            className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg bg-primary text-primary-foreground"
          >
            Apply Filters {count > 0 && `(${count})`}
          </Button>
        </div>
      </div>

      {/* Bottom Navigation Spacer */}
      <div className="h-16 sm:h-20"></div>
    </div>
  )
}
