"use client"

import { useEffect, useState } from "react"
import { Button } from "@/shared/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog"
import { Input } from "@/shared/ui/input"
import { Label } from "@/shared/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select"
import { Textarea } from "@/shared/ui/textarea"
import type { CreateMenuItemInput, MenuItem } from "../types"

interface CategoryOption {
  id: number
  name: string
}

const defaultForm: CreateMenuItemInput = {
  name: "",
  description: "",
  categoryId: 0,
  price: 0,
  imageUrl: "",
  preparationTime: 10,
  isAvailable: true,
}

interface MenuItemFormProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSubmit: (input: CreateMenuItemInput) => Promise<void>
  isPending: boolean
  categories: CategoryOption[]
  initialItem?: MenuItem | null
}

export function MenuItemForm({
  open,
  onOpenChange,
  onSubmit,
  isPending,
  categories,
  initialItem,
}: MenuItemFormProps) {
  const [form, setForm] = useState<CreateMenuItemInput>(defaultForm)

  useEffect(() => {
    if (!open) {
      return
    }

    if (initialItem) {
      setForm({
        name: initialItem.name,
        description: initialItem.description,
        categoryId: initialItem.categoryId,
        price: initialItem.price,
        imageUrl: initialItem.image,
        preparationTime: initialItem.preparationTime,
        isAvailable: initialItem.isAvailable,
      })
      return
    }

    setForm(defaultForm)
  }, [initialItem, open])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    await onSubmit(form)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {initialItem ? "Modifier l'article" : "Ajouter un article"}
          </DialogTitle>
          <DialogDescription>
            Gérez les prix, les images et la disponibilité du menu du restaurant.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="menu-name">Nom</Label>
              <Input
                id="menu-name"
                value={form.name}
                onChange={(event) =>
                  setForm((current) => ({ ...current, name: event.target.value }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="menu-category">Catégorie</Label>
              <Select
                value={String(form.categoryId)}
                onValueChange={(categoryId) =>
                  setForm((current) => ({
                    ...current,
                    categoryId: Number(categoryId),
                  }))
                }
              >
                <SelectTrigger id="menu-category">
                  <SelectValue placeholder="Sélectionner une catégorie" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat.id} value={String(cat.id)}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="menu-description">Description</Label>
            <Textarea
              id="menu-description"
              value={form.description}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  description: event.target.value,
                }))
              }
              rows={4}
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="menu-price">Prix</Label>
              <Input
                id="menu-price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    price: Number(event.target.value) || 0,
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="menu-prep-time">Temps de prép. (min)</Label>
              <Input
                id="menu-prep-time"
                type="number"
                min="0"
                value={form.preparationTime}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    preparationTime: Number(event.target.value) || 0,
                  }))
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="menu-status">Disponibilité</Label>
              <Select
                value={form.isAvailable ? "available" : "unavailable"}
                onValueChange={(value) =>
                  setForm((current) => ({
                    ...current,
                    isAvailable: value === "available",
                  }))
                }
              >
                <SelectTrigger id="menu-status">
                  <SelectValue placeholder="Sélectionner un statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Disponible</SelectItem>
                  <SelectItem value="unavailable">Indisponible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="menu-image-url">URL de l'image</Label>
            <Input
              id="menu-image-url"
              type="url"
              placeholder="https://..."
              value={form.imageUrl}
              onChange={(event) =>
                setForm((current) => ({
                  ...current,
                  imageUrl: event.target.value,
                }))
              }
            />
          </div>
          <div className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isPending}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? initialItem
                  ? "Enregistrement..."
                  : "Création..."
                : initialItem
                  ? "Enregistrer"
                  : "Créer"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

