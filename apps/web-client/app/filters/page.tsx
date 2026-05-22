"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { ThemeToggle } from "@/components/theme-toggle"
import { BurgerMenu } from "@/components/burger-menu"
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

const spiceLevels = [
  { id: "mild", name: "Mild", color: "bg-green-100 text-green-800" },
  { id: "medium", name: "Medium", color: "bg-yellow-100 text-yellow-800" },
  { id: "hot", name: "Hot", color: "bg-orange-100 text-orange-800" },
  { id: "very-hot", name: "Very Hot", color: "bg-red-100 text-red-800" },
]

export default function FiltersPage() {
  const router = useRouter()
  const [selectedDietary, setSelectedDietary] = useState<string[]>([])
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([])
  const [selectedSpice, setSelectedSpice] = useState<string[]>([])
  const [priceRange, setPriceRange] = useState([0, 50])
  const [prepTime, setPrepTime] = useState([0, 60])
  const [showPopularOnly, setShowPopularOnly] = useState(false)
  const [sortBy, setSortBy] = useState("recommended")

  const toggleDietaryFilter = (dietary: string) => {
    setSelectedDietary((prev) => (prev.includes(dietary) ? prev.filter((d) => d !== dietary) : [...prev, dietary]))
  }

  const toggleCuisineFilter = (cuisine: string) => {
    setSelectedCuisines((prev) => (prev.includes(cuisine) ? prev.filter((c) => c !== cuisine) : [...prev, cuisine]))
  }

  const toggleSpiceFilter = (spice: string) => {
    setSelectedSpice((prev) => (prev.includes(spice) ? prev.filter((s) => s !== spice) : [...prev, spice]))
  }

  const clearAllFilters = () => {
    setSelectedDietary([])
    setSelectedCuisines([])
    setSelectedSpice([])
    setPriceRange([0, 50])
    setPrepTime([0, 60])
    setShowPopularOnly(false)
    setSortBy("recommended")
  }

  const applyFilters = () => {
    // In a real app, this would pass filters back to the menu page
    // For now, we'll just navigate back
    router.push("/menu")
  }

  const activeFiltersCount =
    selectedDietary.length +
    selectedCuisines.length +
    selectedSpice.length +
    (showPopularOnly ? 1 : 0) +
    (sortBy !== "recommended" ? 1 : 0)

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="flex items-center justify-between p-2 sm:p-3 md:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <BurgerMenu currentPage="filters" />
            <Link href="/menu" className="hidden md:block">
              <Button variant="ghost" size="sm" className="p-2">
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg sm:text-xl font-bold">Filters</h1>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {activeFiltersCount > 0 ? `${activeFiltersCount} active filters` : "No filters applied"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 sm:gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Button variant="ghost" onClick={clearAllFilters} className="text-xs sm:text-sm px-2 sm:px-3">
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
              {[
                { id: "recommended", name: "Recommended" },
                { id: "price-low", name: "Price: Low to High" },
                { id: "price-high", name: "Price: High to Low" },
                { id: "popular", name: "Most Popular" },
                { id: "prep-time", name: "Prep Time" },
                { id: "rating", name: "Highest Rated" },
              ].map((option) => (
                <Button
                  key={option.id}
                  variant={sortBy === option.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSortBy(option.id)}
                  className={`text-xs sm:text-sm ${sortBy === option.id ? "restaurant-gradient text-white" : ""}`}
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
              <Slider value={priceRange} onValueChange={setPriceRange} max={50} min={0} step={1} className="w-full" />
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
              <Slider value={prepTime} onValueChange={setPrepTime} max={60} min={0} step={5} className="w-full" />
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
                const isSelected = selectedDietary.includes(option.id)
                return (
                  <Button
                    key={option.id}
                    variant={isSelected ? "default" : "outline"}
                    size="sm"
                    onClick={() => toggleDietaryFilter(option.id)}
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
                  variant={selectedCuisines.includes(cuisine) ? "default" : "outline"}
                  className={`cursor-pointer text-xs sm:text-sm hover:scale-105 transition-transform duration-200 ${
                    selectedCuisines.includes(cuisine) ? "restaurant-gradient text-white" : ""
                  }`}
                  onClick={() => toggleCuisineFilter(cuisine)}
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
                  variant={selectedSpice.includes(level.id) ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSpiceFilter(level.id)}
                  className={`text-xs sm:text-sm ${selectedSpice.includes(level.id) ? "restaurant-gradient text-white" : ""}`}
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
              variant={showPopularOnly ? "default" : "outline"}
              onClick={() => setShowPopularOnly(!showPopularOnly)}
              className={`w-full text-xs sm:text-sm ${showPopularOnly ? "restaurant-gradient text-white" : ""}`}
            >
              <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-2" />
              Show Popular Items Only
            </Button>
          </CardContent>
        </Card>

        {/* Apply Filters Button */}
        <div className="sticky bottom-4">
          <Button
            onClick={applyFilters}
            className="w-full h-12 sm:h-14 text-sm sm:text-base md:text-lg restaurant-gradient text-white"
          >
            Apply Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}
          </Button>
        </div>
      </div>

      {/* Bottom Navigation Spacer */}
      <div className="h-16 sm:h-20"></div>
    </div>
  )
}
