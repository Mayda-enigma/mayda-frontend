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

  const categories = useMemo(() => {
    const seen = new Map<number, { id: number; name: string }>()
    menuItems.forEach((item) => {
      if (!seen.has(item.categoryId)) {
        seen.set(item.categoryId, { id: item.categoryId, name: item.category })
      }
    })
    return Array.from(seen.values()).sort((a, b) => a.name.localeCompare(b.name))
  }, [menuItems])

  const fallbackCategories = [
    { id: 1, name: "Pizza" },
    { id: 2, name: "Pasta" },
    { id: 3, name: "Salads" },
    { id: 4, name: "Burgers" },
  ]

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
      await toggleAvailability.mutateAsync({ id: item.id })
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
          <h1 className="text-3xl font-semibold text-balance">Gestion du menu</h1>
          <p className="text-base text-muted-foreground">
            Publiez les mises à jour du menu, contrôlez la disponibilité et gardez les catégories organisées.
          </p>
        </div>
        {restaurantId !== null ? (
          <Button onClick={() => setIsCreateOpen(true)}>
            <Plus className="h-4 w-4" />
            Ajouter un article
          </Button>
        ) : null}
      </div>

      <MenuItemForm
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        onSubmit={handleCreate}
        isPending={createMenuItem.isPending}
        categories={categories.length > 0 ? categories : fallbackCategories}
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
        categories={categories.length > 0 ? categories : fallbackCategories}
        initialItem={editingItem}
      />

      {isUserLoading || menuQuery.isLoading ? (
        <Alert>
          <AlertTitle>Chargement du menu</AlertTitle>
          <AlertDescription>
            Récupération des derniers plats de ce restaurant.
          </AlertDescription>
        </Alert>
      ) : null}
      {!isUserLoading && restaurantId === null ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Contexte du restaurant manquant</AlertTitle>
          <AlertDescription>
            Ce compte gestionnaire n'est lié à aucun restaurant. La gestion du menu est
            donc indisponible.
          </AlertDescription>
        </Alert>
      ) : null}
      {menuQuery.isError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Impossible de charger le menu</AlertTitle>
          <AlertDescription>
            La requête API du menu a échoué. Actualisez la page et réessayez.
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
                <p className="text-xs font-medium text-muted-foreground">Articles du menu</p>
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
                <p className="text-xs font-medium text-muted-foreground">Disponible maintenant</p>
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
                <p className="text-xs font-medium text-muted-foreground">Prép. moy. / Prix</p>
                <p className="text-2xl font-semibold tabular-nums">
                  {averagePrepTime}m / {averagePrice.toFixed(2)} DZD
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Catalogue</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-4 lg:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Rechercher des articles"
                className="pl-9"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full lg:w-56">
                <SelectValue placeholder="Catégorie" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les catégories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.name}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full lg:w-56">
                <SelectValue placeholder="Disponibilité" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les statuts</SelectItem>
                <SelectItem value="available">Disponible</SelectItem>
                <SelectItem value="unavailable">Indisponible</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {!menuQuery.isLoading && filteredItems.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              Aucun article ne correspond aux filtres actuels.
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

