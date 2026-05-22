"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "@/hooks/use-toast"
import {
  ChefHat,
  Plus,
  Edit,
  Trash2,
  Star,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Clock,
  Users,
  Zap,
  Tag,
  ImageIcon,
  Search,
} from "lucide-react"

// Mock data for menu items
const initialMenuItems = [
  {
    id: 1,
    name: "Pizza Margherita",
    description: "Classic Italian pizza with fresh mozzarella, tomatoes, and basil",
    category: "Pizza",
    price: 15.99,
    cost: 6.5,
    image: "/pizza-margherita.jpg",
    status: "active",
    popularity: 92,
    orders: 145,
    revenue: 2319.55,
    rating: 4.8,
    prepTime: 12,
    ingredients: ["Mozzarella", "Tomatoes", "Basil", "Pizza Dough"],
    allergens: ["Gluten", "Dairy"],
    calories: 280,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
  },
  {
    id: 2,
    name: "Chicken Alfredo",
    description: "Creamy pasta with grilled chicken breast and parmesan cheese",
    category: "Pasta",
    price: 18.99,
    cost: 7.25,
    image: "/chicken-alfredo.jpg",
    status: "active",
    popularity: 88,
    orders: 128,
    revenue: 2430.72,
    rating: 4.6,
    prepTime: 15,
    ingredients: ["Chicken Breast", "Fettuccine", "Heavy Cream", "Parmesan"],
    allergens: ["Gluten", "Dairy"],
    calories: 520,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
  },
  {
    id: 3,
    name: "Caesar Salad",
    description: "Fresh romaine lettuce with caesar dressing, croutons, and parmesan",
    category: "Salads",
    price: 12.99,
    cost: 4.8,
    image: "/caesar-salad.jpg",
    status: "active",
    popularity: 75,
    orders: 98,
    revenue: 1273.02,
    rating: 4.4,
    prepTime: 8,
    ingredients: ["Romaine Lettuce", "Caesar Dressing", "Croutons", "Parmesan"],
    allergens: ["Gluten", "Dairy", "Eggs"],
    calories: 180,
    isVegetarian: true,
    isVegan: false,
    isGlutenFree: false,
  },
  {
    id: 4,
    name: "Beef Burger",
    description: "Juicy beef patty with lettuce, tomato, onion, and special sauce",
    category: "Burgers",
    price: 16.99,
    cost: 8.2,
    image: "/beef-burger.jpg",
    status: "active",
    popularity: 82,
    orders: 87,
    revenue: 1478.13,
    rating: 4.7,
    prepTime: 18,
    ingredients: ["Beef Patty", "Burger Bun", "Lettuce", "Tomato", "Onion"],
    allergens: ["Gluten"],
    calories: 650,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
  },
  {
    id: 5,
    name: "Vegan Buddha Bowl",
    description: "Quinoa bowl with roasted vegetables, avocado, and tahini dressing",
    category: "Healthy",
    price: 14.99,
    cost: 5.9,
    image: "/vegan-buddha-bowl.jpg",
    status: "active",
    popularity: 68,
    orders: 64,
    revenue: 959.36,
    rating: 4.5,
    prepTime: 10,
    ingredients: ["Quinoa", "Roasted Vegetables", "Avocado", "Tahini"],
    allergens: ["Sesame"],
    calories: 420,
    isVegetarian: true,
    isVegan: true,
    isGlutenFree: true,
  },
]

const categories = ["Pizza", "Pasta", "Salads", "Burgers", "Healthy", "Desserts", "Beverages"]

const initialPromotions = [
  {
    id: 1,
    name: "Weekend Pizza Special",
    description: "20% off all pizzas on weekends",
    discount: 20,
    type: "percentage",
    startDate: "2024-01-20",
    endDate: "2024-02-20",
    status: "active",
    applicableItems: ["Pizza Margherita"],
    usage: 45,
    maxUsage: 100,
  },
  {
    id: 2,
    name: "Happy Hour Drinks",
    description: "$5 off all beverages from 4-6 PM",
    discount: 5,
    type: "fixed",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    status: "active",
    applicableItems: ["Beverages"],
    usage: 78,
    maxUsage: 200,
  },
]

export function MenuManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isPromotionDialogOpen, setIsPromotionDialogOpen] = useState(false)
  const [isEditPromotionDialogOpen, setIsEditPromotionDialogOpen] = useState(false)
  const [isDeletePromotionDialogOpen, setIsDeletePromotionDialogOpen] = useState(false)
  const [selectedMenuItem, setSelectedMenuItem] = useState<any>(null)
  const [selectedPromotion, setSelectedPromotion] = useState<any>(null)
  const [menuItems, setMenuItems] = useState(initialMenuItems)
  const [promotions, setPromotions] = useState(initialPromotions)

  const [menuFormData, setMenuFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    cost: "",
    prepTime: "",
    calories: "",
    ingredients: "",
    allergens: "",
    status: "active",
  })

  const [promoFormData, setPromoFormData] = useState({
    name: "",
    description: "",
    discount: "",
    type: "percentage",
    startDate: "",
    endDate: "",
    maxUsage: "",
  })

  const resetMenuForm = () => {
    setMenuFormData({
      name: "",
      description: "",
      category: "",
      price: "",
      cost: "",
      prepTime: "",
      calories: "",
      ingredients: "",
      allergens: "",
      status: "active",
    })
  }

  const resetPromoForm = () => {
    setPromoFormData({
      name: "",
      description: "",
      discount: "",
      type: "percentage",
      startDate: "",
      endDate: "",
      maxUsage: "",
    })
  }

  const handleAddMenuItem = () => {
    if (!menuFormData.name || !menuFormData.description || !menuFormData.category || !menuFormData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newMenuItem = {
      id: Math.max(...menuItems.map((item) => item.id)) + 1,
      ...menuFormData,
      price: Number.parseFloat(menuFormData.price),
      cost: Number.parseFloat(menuFormData.cost) || 0,
      prepTime: Number.parseInt(menuFormData.prepTime) || 0,
      calories: Number.parseInt(menuFormData.calories) || 0,
      ingredients: menuFormData.ingredients
        .split(",")
        .map((i) => i.trim())
        .filter((i) => i),
      allergens: menuFormData.allergens
        .split(",")
        .map((a) => a.trim())
        .filter((a) => a),
      popularity: Math.floor(Math.random() * 40) + 60, // Random popularity 60-100
      orders: 0,
      revenue: 0,
      rating: 4.0,
      image: "/placeholder-dish.jpg",
      isVegetarian: false,
      isVegan: false,
      isGlutenFree: false,
    }

    setMenuItems([...menuItems, newMenuItem])
    setIsAddDialogOpen(false)
    resetMenuForm()
    toast({
      title: "Success",
      description: "Menu item added successfully.",
    })
  }

  const handleEditMenuItem = () => {
    if (!menuFormData.name || !menuFormData.description || !menuFormData.category || !menuFormData.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const updatedMenuItems = menuItems.map((item) =>
      item.id === selectedMenuItem.id
        ? {
            ...item,
            ...menuFormData,
            price: Number.parseFloat(menuFormData.price),
            cost: Number.parseFloat(menuFormData.cost) || item.cost,
            prepTime: Number.parseInt(menuFormData.prepTime) || item.prepTime,
            calories: Number.parseInt(menuFormData.calories) || item.calories,
            ingredients: menuFormData.ingredients
              .split(",")
              .map((i) => i.trim())
              .filter((i) => i),
            allergens: menuFormData.allergens
              .split(",")
              .map((a) => a.trim())
              .filter((a) => a),
          }
        : item,
    )

    setMenuItems(updatedMenuItems)
    setIsEditDialogOpen(false)
    setSelectedMenuItem(null)
    resetMenuForm()
    toast({
      title: "Success",
      description: "Menu item updated successfully.",
    })
  }

  const handleDeleteMenuItem = () => {
    const updatedMenuItems = menuItems.filter((item) => item.id !== selectedMenuItem.id)
    setMenuItems(updatedMenuItems)
    setIsDeleteDialogOpen(false)
    setSelectedMenuItem(null)
    toast({
      title: "Success",
      description: "Menu item deleted successfully.",
    })
  }

  const openEditMenuDialog = (item: any) => {
    setSelectedMenuItem(item)
    setMenuFormData({
      name: item.name,
      description: item.description,
      category: item.category,
      price: item.price.toString(),
      cost: item.cost.toString(),
      prepTime: item.prepTime.toString(),
      calories: item.calories.toString(),
      ingredients: item.ingredients.join(", "),
      allergens: item.allergens.join(", "),
      status: item.status,
    })
    setIsEditDialogOpen(true)
  }

  const openDeleteMenuDialog = (item: any) => {
    setSelectedMenuItem(item)
    setIsDeleteDialogOpen(true)
  }

  const handleAddPromotion = () => {
    if (!promoFormData.name || !promoFormData.description || !promoFormData.discount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const newPromotion = {
      id: Math.max(...promotions.map((p) => p.id)) + 1,
      ...promoFormData,
      discount: Number.parseFloat(promoFormData.discount),
      maxUsage: Number.parseInt(promoFormData.maxUsage) || 100,
      status: "active",
      applicableItems: [],
      usage: 0,
    }

    setPromotions([...promotions, newPromotion])
    setIsPromotionDialogOpen(false)
    resetPromoForm()
    toast({
      title: "Success",
      description: "Promotion created successfully.",
    })
  }

  const handleEditPromotion = () => {
    if (!promoFormData.name || !promoFormData.description || !promoFormData.discount) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      return
    }

    const updatedPromotions = promotions.map((promo) =>
      promo.id === selectedPromotion.id
        ? {
            ...promo,
            ...promoFormData,
            discount: Number.parseFloat(promoFormData.discount),
            maxUsage: Number.parseInt(promoFormData.maxUsage) || promo.maxUsage,
          }
        : promo,
    )

    setPromotions(updatedPromotions)
    setIsEditPromotionDialogOpen(false)
    setSelectedPromotion(null)
    resetPromoForm()
    toast({
      title: "Success",
      description: "Promotion updated successfully.",
    })
  }

  const handleDeletePromotion = () => {
    const updatedPromotions = promotions.filter((promo) => promo.id !== selectedPromotion.id)
    setPromotions(updatedPromotions)
    setIsDeletePromotionDialogOpen(false)
    setSelectedPromotion(null)
    toast({
      title: "Success",
      description: "Promotion deleted successfully.",
    })
  }

  const openEditPromotionDialog = (promo: any) => {
    setSelectedPromotion(promo)
    setPromoFormData({
      name: promo.name,
      description: promo.description,
      discount: promo.discount.toString(),
      type: promo.type,
      startDate: promo.startDate,
      endDate: promo.endDate,
      maxUsage: promo.maxUsage.toString(),
    })
    setIsEditPromotionDialogOpen(true)
  }

  const openDeletePromotionDialog = (promo: any) => {
    setSelectedPromotion(promo)
    setIsDeletePromotionDialogOpen(true)
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500 text-white"
      case "inactive":
        return "bg-gray-500 text-white"
      case "seasonal":
        return "bg-orange-500 text-white"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPopularityColor = (popularity: number) => {
    if (popularity >= 80) return "text-green-500"
    if (popularity >= 60) return "text-yellow-500"
    return "text-red-500"
  }

  const getProfitMargin = (price: number, cost: number) => {
    return (((price - cost) / price) * 100).toFixed(1)
  }

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || item.category === filterCategory
    const matchesStatus = filterStatus === "all" || item.status === filterStatus
    return matchesSearch && matchesCategory && matchesStatus
  })

  const totalItems = menuItems.length
  const activeItems = menuItems.filter((item) => item.status === "active").length
  const avgRating = menuItems.reduce((sum, item) => sum + item.rating, 0) / menuItems.length
  const totalRevenue = menuItems.reduce((sum, item) => sum + item.revenue, 0)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-balance">Menu Management</h1>
          <p className="text-muted-foreground text-pretty">Manage dishes, track performance, and optimize pricing</p>
        </div>
        <div className="flex gap-2">
          <Dialog open={isPromotionDialogOpen} onOpenChange={setIsPromotionDialogOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" onClick={resetPromoForm}>
                <Tag className="h-4 w-4 mr-2" />
                Add Promotion
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Create New Promotion</DialogTitle>
                <DialogDescription>Set up a new promotional campaign</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="promoName">Promotion Name *</Label>
                    <Input
                      id="promoName"
                      placeholder="Weekend Special"
                      value={promoFormData.name}
                      onChange={(e) => setPromoFormData({ ...promoFormData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="discountType">Discount Type</Label>
                    <Select
                      value={promoFormData.type}
                      onValueChange={(value) => setPromoFormData({ ...promoFormData, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="percentage">Percentage</SelectItem>
                        <SelectItem value="fixed">Fixed Amount</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="promoDescription">Description *</Label>
                  <Textarea
                    id="promoDescription"
                    placeholder="Promotion description..."
                    value={promoFormData.description}
                    onChange={(e) => setPromoFormData({ ...promoFormData, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="discountValue">Discount Value *</Label>
                    <Input
                      id="discountValue"
                      type="number"
                      placeholder="20"
                      value={promoFormData.discount}
                      onChange={(e) => setPromoFormData({ ...promoFormData, discount: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="startDate">Start Date</Label>
                    <Input
                      id="startDate"
                      type="date"
                      value={promoFormData.startDate}
                      onChange={(e) => setPromoFormData({ ...promoFormData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="endDate">End Date</Label>
                    <Input
                      id="endDate"
                      type="date"
                      value={promoFormData.endDate}
                      onChange={(e) => setPromoFormData({ ...promoFormData, endDate: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="maxUsage">Max Usage</Label>
                    <Input
                      id="maxUsage"
                      type="number"
                      placeholder="100"
                      value={promoFormData.maxUsage}
                      onChange={(e) => setPromoFormData({ ...promoFormData, maxUsage: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsPromotionDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddPromotion}>Create Promotion</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={resetMenuForm}>
                <Plus className="h-4 w-4 mr-2" />
                Add Dish
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle>Add New Menu Item</DialogTitle>
                <DialogDescription>Create a new dish for your menu</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="dishName">Dish Name *</Label>
                    <Input
                      id="dishName"
                      placeholder="Enter dish name"
                      value={menuFormData.name}
                      onChange={(e) => setMenuFormData({ ...menuFormData, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category *</Label>
                    <Select
                      value={menuFormData.category}
                      onValueChange={(value) => setMenuFormData({ ...menuFormData, category: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the dish..."
                    value={menuFormData.description}
                    onChange={(e) => setMenuFormData({ ...menuFormData, description: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($) *</Label>
                    <Input
                      id="price"
                      type="number"
                      step="0.01"
                      placeholder="15.99"
                      value={menuFormData.price}
                      onChange={(e) => setMenuFormData({ ...menuFormData, price: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost ($)</Label>
                    <Input
                      id="cost"
                      type="number"
                      step="0.01"
                      placeholder="6.50"
                      value={menuFormData.cost}
                      onChange={(e) => setMenuFormData({ ...menuFormData, cost: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="prepTime">Prep Time (min)</Label>
                    <Input
                      id="prepTime"
                      type="number"
                      placeholder="15"
                      value={menuFormData.prepTime}
                      onChange={(e) => setMenuFormData({ ...menuFormData, prepTime: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="calories">Calories</Label>
                    <Input
                      id="calories"
                      type="number"
                      placeholder="280"
                      value={menuFormData.calories}
                      onChange={(e) => setMenuFormData({ ...menuFormData, calories: e.target.value })}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ingredients">Ingredients (comma separated)</Label>
                  <Input
                    id="ingredients"
                    placeholder="Mozzarella, Tomatoes, Basil..."
                    value={menuFormData.ingredients}
                    onChange={(e) => setMenuFormData({ ...menuFormData, ingredients: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="allergens">Allergens (comma separated)</Label>
                  <Input
                    id="allergens"
                    placeholder="Gluten, Dairy..."
                    value={menuFormData.allergens}
                    onChange={(e) => setMenuFormData({ ...menuFormData, allergens: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleAddMenuItem}>Add Dish</Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Edit Menu Item</DialogTitle>
            <DialogDescription>Update dish details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-dishName">Dish Name *</Label>
                <Input
                  id="edit-dishName"
                  placeholder="Enter dish name"
                  value={menuFormData.name}
                  onChange={(e) => setMenuFormData({ ...menuFormData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category *</Label>
                <Select
                  value={menuFormData.category}
                  onValueChange={(value) => setMenuFormData({ ...menuFormData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea
                id="edit-description"
                placeholder="Describe the dish..."
                value={menuFormData.description}
                onChange={(e) => setMenuFormData({ ...menuFormData, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-5 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-price">Price ($) *</Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  placeholder="15.99"
                  value={menuFormData.price}
                  onChange={(e) => setMenuFormData({ ...menuFormData, price: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-cost">Cost ($)</Label>
                <Input
                  id="edit-cost"
                  type="number"
                  step="0.01"
                  placeholder="6.50"
                  value={menuFormData.cost}
                  onChange={(e) => setMenuFormData({ ...menuFormData, cost: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-prepTime">Prep Time (min)</Label>
                <Input
                  id="edit-prepTime"
                  type="number"
                  placeholder="15"
                  value={menuFormData.prepTime}
                  onChange={(e) => setMenuFormData({ ...menuFormData, prepTime: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-calories">Calories</Label>
                <Input
                  id="edit-calories"
                  type="number"
                  placeholder="280"
                  value={menuFormData.calories}
                  onChange={(e) => setMenuFormData({ ...menuFormData, calories: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-status">Status</Label>
                <Select
                  value={menuFormData.status}
                  onValueChange={(value) => setMenuFormData({ ...menuFormData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-ingredients">Ingredients (comma separated)</Label>
              <Input
                id="edit-ingredients"
                placeholder="Mozzarella, Tomatoes, Basil..."
                value={menuFormData.ingredients}
                onChange={(e) => setMenuFormData({ ...menuFormData, ingredients: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-allergens">Allergens (comma separated)</Label>
              <Input
                id="edit-allergens"
                placeholder="Gluten, Dairy..."
                value={menuFormData.allergens}
                onChange={(e) => setMenuFormData({ ...menuFormData, allergens: e.target.value })}
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditMenuItem}>Update Dish</Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Menu Item</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedMenuItem?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteMenuItem}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isEditPromotionDialogOpen} onOpenChange={setIsEditPromotionDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Promotion</DialogTitle>
            <DialogDescription>Update promotional campaign details</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-promoName">Promotion Name *</Label>
                <Input
                  id="edit-promoName"
                  placeholder="Weekend Special"
                  value={promoFormData.name}
                  onChange={(e) => setPromoFormData({ ...promoFormData, name: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-discountType">Discount Type</Label>
                <Select
                  value={promoFormData.type}
                  onValueChange={(value) => setPromoFormData({ ...promoFormData, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="percentage">Percentage</SelectItem>
                    <SelectItem value="fixed">Fixed Amount</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-promoDescription">Description *</Label>
              <Textarea
                id="edit-promoDescription"
                placeholder="Promotion description..."
                value={promoFormData.description}
                onChange={(e) => setPromoFormData({ ...promoFormData, description: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-discountValue">Discount Value *</Label>
                <Input
                  id="edit-discountValue"
                  type="number"
                  placeholder="20"
                  value={promoFormData.discount}
                  onChange={(e) => setPromoFormData({ ...promoFormData, discount: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-startDate">Start Date</Label>
                <Input
                  id="edit-startDate"
                  type="date"
                  value={promoFormData.startDate}
                  onChange={(e) => setPromoFormData({ ...promoFormData, startDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-endDate">End Date</Label>
                <Input
                  id="edit-endDate"
                  type="date"
                  value={promoFormData.endDate}
                  onChange={(e) => setPromoFormData({ ...promoFormData, endDate: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-maxUsage">Max Usage</Label>
                <Input
                  id="edit-maxUsage"
                  type="number"
                  placeholder="100"
                  value={promoFormData.maxUsage}
                  onChange={(e) => setPromoFormData({ ...promoFormData, maxUsage: e.target.value })}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsEditPromotionDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditPromotion}>Update Promotion</Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={isDeletePromotionDialogOpen} onOpenChange={setIsDeletePromotionDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Promotion</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{selectedPromotion?.name}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeletePromotion}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-l-4 border-l-primary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <ChefHat className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalItems}</div>
            <p className="text-xs text-muted-foreground">{activeItems} active dishes</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Rating</CardTitle>
            <Star className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">{avgRating.toFixed(1)}</div>
            <p className="text-xs text-muted-foreground">Customer satisfaction</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-secondary">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Menu Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Total from menu items</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-accent">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Promos</CardTitle>
            <Tag className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{promotions.filter((p) => p.status === "active").length}</div>
            <p className="text-xs text-muted-foreground">Running campaigns</p>
          </CardContent>
        </Card>
      </div>

      {/* AI Insights */}
      <Card className="bg-gradient-to-r from-primary/10 to-secondary/10 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            AI Menu Insights & Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-500 mt-0.5" />
            <div>
              <p className="font-medium">Pizza Margherita showing 25% demand increase</p>
              <p className="text-sm text-muted-foreground">
                Consider featuring as weekend special. Optimal price point: $17.99 (+12% revenue potential)
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
            <DollarSign className="h-5 w-5 text-primary mt-0.5" />
            <div>
              <p className="font-medium">Vegan Buddha Bowl underperforming at current price</p>
              <p className="text-sm text-muted-foreground">
                Reduce price to $13.99 to increase orders by estimated 40%. High profit margin allows flexibility.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-3 bg-background/50 rounded-lg">
            <Star className="h-5 w-5 text-accent mt-0.5" />
            <div>
              <p className="font-medium">Chicken Alfredo has highest customer satisfaction</p>
              <p className="text-sm text-muted-foreground">
                Perfect candidate for premium version. Consider adding truffle or premium ingredients.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Menu Management Tabs */}
      <Tabs defaultValue="items" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="items">Menu Items</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="promotions">Promotions</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="items" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search menu items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={filterCategory} onValueChange={setFilterCategory}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="seasonal">Seasonal</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Menu Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <Card key={item.id} className="overflow-hidden">
                <div className="aspect-video bg-muted flex items-center justify-center">
                  <ImageIcon className="h-12 w-12 text-muted-foreground" />
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                    </div>
                    <Badge className={getStatusColor(item.status)}>{item.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{item.category}</Badge>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-500" />
                      <span className="text-sm">{item.rating}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Price</p>
                      <p className="font-semibold text-lg">${item.price}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Profit Margin</p>
                      <p className="font-semibold text-lg text-green-500">{getProfitMargin(item.price, item.cost)}%</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span>Popularity</span>
                      <span className={getPopularityColor(item.popularity)}>{item.popularity}%</span>
                    </div>
                    <Progress value={item.popularity} className="h-2" />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <span>{item.prepTime} min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-3 w-3 text-muted-foreground" />
                      <span>{item.orders} orders</span>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent hover:bg-primary/10"
                      onClick={() => openEditMenuDialog(item)}
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDeleteMenuDialog(item)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Menu Performance Analytics</CardTitle>
              <CardDescription>Detailed performance metrics for each menu item</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Rating</TableHead>
                    <TableHead>Popularity</TableHead>
                    <TableHead>Profit Margin</TableHead>
                    <TableHead>Trend</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {menuItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">${item.price}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{item.category}</Badge>
                      </TableCell>
                      <TableCell>{item.orders}</TableCell>
                      <TableCell>${item.revenue.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 text-yellow-500" />
                          {item.rating}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Progress value={item.popularity} className="w-16 h-2" />
                          <span className={`text-sm ${getPopularityColor(item.popularity)}`}>{item.popularity}%</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-green-500 font-medium">{getProfitMargin(item.price, item.cost)}%</span>
                      </TableCell>
                      <TableCell>
                        {item.popularity > 80 ? (
                          <TrendingUp className="h-4 w-4 text-green-500" />
                        ) : (
                          <TrendingDown className="h-4 w-4 text-red-500" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="promotions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Active Promotions</CardTitle>
              <CardDescription>Manage promotional campaigns and special offers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {promotions.map((promo) => (
                <div key={promo.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold">{promo.name}</h3>
                      <Badge className={getStatusColor(promo.status)}>{promo.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{promo.description}</p>
                    <div className="flex items-center gap-4 text-sm">
                      <span>{promo.type === "percentage" ? `${promo.discount}% off` : `$${promo.discount} off`}</span>
                      <span>
                        {promo.startDate} - {promo.endDate}
                      </span>
                      <span>
                        Used: {promo.usage}/{promo.maxUsage}
                      </span>
                    </div>
                    <Progress value={(promo.usage / promo.maxUsage) * 100} className="w-48 h-2 mt-2" />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openEditPromotionDialog(promo)}
                      className="hover:bg-primary/10"
                    >
                      <Edit className="h-3 w-3 mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDeletePromotionDialog(promo)}
                      className="hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Menu Categories</CardTitle>
              <CardDescription>Organize and manage menu categories</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => {
                  const categoryItems = menuItems.filter((item) => item.category === category)
                  const categoryRevenue = categoryItems.reduce((sum, item) => sum + item.revenue, 0)
                  return (
                    <Card key={category}>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-lg">{category}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span>Items</span>
                          <span className="font-medium">{categoryItems.length}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Revenue</span>
                          <span className="font-medium">${categoryRevenue.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span>Avg Rating</span>
                          <span className="font-medium">
                            {categoryItems.length > 0
                              ? (
                                  categoryItems.reduce((sum, item) => sum + item.rating, 0) / categoryItems.length
                                ).toFixed(1)
                              : "N/A"}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
