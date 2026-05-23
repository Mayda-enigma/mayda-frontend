"use client"

import { useMemo, useState } from "react"
import { useCurrentUser } from "@/features/auth/api/queries"
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { useToast } from "@/shared/ui/use-toast"
import { AlertCircle, ChefHat, Clock3, Plus, Search, Tag } from "lucide-react"
import {
  useCreateMenuItem,
  useDeleteMenuItem,
  useToggleAvailability,
  useUpdateMenuItem,
} from "../api/mutations"
import { useMenu } from "../api/queries"
import { MenuItemForm } from "./menu-item-form"
import { MenuTable } from "./menu-table"
import type { CreateMenuItemInput, MenuItem } from "../types"

export function MenuManagement() {
  const { toast } = useToast()
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const restaurantId = user?.restaurantId ?? null

  const menuQuery = useMenu(restaurantId)
  const menuItems = menuQuery.data ?? []

  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)

  const createMenuItem = useCreateMenuItem(restaurantId ?? 0)
  const updateMenuItem = useUpdateMenuItem(restaurantId ?? 0)
  const deleteMenuItem = useDeleteMenuItem(restaurantId ?? 0)
  const toggleAvailability = useToggleAvailability(restaurantId ?? 0)

  const categories = useMemo(
    () => Array.from(new Set(menuItems.map((item) => item.category))).sort(),
    [menuItems],
  )

  const filteredItems = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase()

    return menuItems.filter((item) => {
      const matchesSearch =
        normalizedSearch.length === 0 ||
        item.name.toLowerCase().includes(normalizedSearch) ||
        item.description.toLowerCase().includes(normalizedSearch)
      const matchesCategory =
        categoryFilter === "all" || item.category === categoryFilter
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "available" && item.isAvailable) ||
        (statusFilter === "unavailable" && !item.isAvailable)

      return matchesSearch && matchesCategory && matchesStatus
    })
  }, [categoryFilter, menuItems, searchTerm, statusFilter])

  const availableCount = menuItems.filter((item) => item.isAvailable).length
  const averagePrepTime =
    menuItems.length > 0
      ? Math.round(
          menuItems.reduce((sum, item) => sum + item.preparationTime, 0) /
            menuItems.length,
        )
      : 0
  const averagePrice =
    menuItems.length > 0
      ? menuItems.reduce((sum, item) => sum + item.price, 0) / menuItems.length
      : 0

  const handleCreate = async (input: CreateMenuItemInput) => {
    try {
      await createMenuItem.mutateAsync(input)
      toast({
        title: "Menu item created",
        description: `${input.name} was added to the menu.`,
      })
      setIsCreateOpen(false)
    } catch {
      toast({
        title: "Create failed",
        description: "The menu item could not be created.",
        variant: "destructive",
      })
    }
  }

  const handleUpdate = async (input: CreateMenuItemInput) => {
    if (!editingItem) {
      return
    }

    try {
      await updateMenuItem.mutateAsync({ id: editingItem.id, input })
      toast({
        title: "Menu item updated",
        description: `${input.name} was saved successfully.`,
      })
      setEditingItem(null)
    } catch {
      toast({
        title: "Update failed",
        description: "The menu item could not be updated.",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (item: MenuItem) => {
    try {
      await deleteMenuItem.mutateAsync(item.id)
      toast({
        title: "Menu item deleted",
        description: `${item.name} was removed from the menu.`,
      })
    } catch {
      toast({
        title: "Delete failed",
        description: "The menu item could not be removed.",
        variant: "destructive",
      })
    }
  }

  const handleToggleAvailability = async (item: MenuItem) => {
    try {
      await toggleAvailability.mutateAsync({
        id: item.id,
        isAvailable: !item.isAvailable,
      })
      toast({
        title: item.isAvailable ? "Item disabled" : "Item enabled",
        description: `${item.name} is now ${
          item.isAvailable ? "hidden" : "available"
        } on the menu.`,
      })
    } catch {
      toast({
        title: "Availability update failed",
        description: "The menu item status could not be changed.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-balance">Menu Management</h1>
          <p className="text-base text-muted-foreground">
            Publish menu updates, control availability, and keep categories tidy.
          </p>
        </div>
        {restaurantId !== null ? (
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            Add Menu Item
          </Button>
        ) : null}
      </div>

      <MenuItemForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
        isPending={createMenuItem.isPending}
        categories={categories.length > 0 ? categories : ["Pizza", "Pasta", "Salads", "Burgers"]}
      />
      <MenuItemForm
        open={editingItem !== null}
        onOpenChange={(open) => {
          if (!open) {
            setEditingItem(null)
          }
        }}
        onSubmit={handleUpdate}
        isPending={updateMenuItem.isPending}
        categories={categories.length > 0 ? categories : ["Pizza", "Pasta", "Salads", "Burgers"]}
        initialItem={editingItem}
      />

      {isUserLoading || menuQuery.isLoading ? (
        <Alert>
          <AlertTitle>Loading menu</AlertTitle>
          <AlertDescription>
            Fetching the latest dishes for this restaurant.
          </AlertDescription>
        </Alert>
      ) : null}
      {!isUserLoading && restaurantId === null ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Restaurant context missing</AlertTitle>
          <AlertDescription>
            This manager account is not linked to a restaurant, so menu CRUD is
            unavailable.
          </AlertDescription>
        </Alert>
      ) : null}
      {menuQuery.isError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Could not load menu</AlertTitle>
          <AlertDescription>
            The menu API request failed. Refresh the page and try again.
          </AlertDescription>
        </Alert>
      ) : null}

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-md bg-primary/15 text-primary">
                <ChefHat className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Menu Items</p>
                <p className="text-2xl font-semibold tabular-nums">{menuItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-md bg-success/15 text-success">
                <Tag className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Available Now</p>
                <p className="text-2xl font-semibold tabular-nums">{availableCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-md bg-accent-blue/15 text-accent-blue">
                <Clock3 className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Avg Prep / Price</p>
                <p className="text-2xl font-semibold tabular-nums">
                  {averagePrepTime}m / ${averagePrice.toFixed(2)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Catalog</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search menu items"
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-56">
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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-56">
                <SelectValue placeholder="Availability" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All States</SelectItem>
                <SelectItem value="available">Available</SelectItem>
                <SelectItem value="unavailable">Unavailable</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!menuQuery.isLoading && filteredItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No menu items matched the current filters.
            </p>
          ) : null}

          <MenuTable
            items={filteredItems}
            onEdit={setEditingItem}
            onDelete={handleDelete}
            onToggleAvailability={handleToggleAvailability}
            deletingId={deleteMenuItem.isPending ? deleteMenuItem.variables : undefined}
            togglingId={toggleAvailability.isPending ? toggleAvailability.variables?.id : undefined}
          />
        </CardContent>
      </Card>
    </div>
  )
}

