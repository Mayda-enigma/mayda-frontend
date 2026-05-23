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

const defaultForm: CreateMenuItemInput = {
  name: "",
  description: "",
  category: "Pizza",
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
  categories: string[]
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
        category: initialItem.category,
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
            {initialItem ? "Edit Menu Item" : "Add Menu Item"}
          </DialogTitle>
          <DialogDescription>
            Manage pricing, imagery, and availability for the restaurant menu.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="menu-name">Name</Label>
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
              <Label htmlFor="menu-category">Category</Label>
              <Select
                value={form.category}
                onValueChange={(category) =>
                  setForm((current) => ({ ...current, category }))
                }
              >
                <SelectTrigger id="menu-category">
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
              <Label htmlFor="menu-price">Price</Label>
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
              <Label htmlFor="menu-prep-time">Prep Time (min)</Label>
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
              <Label htmlFor="menu-status">Availability</Label>
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
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="unavailable">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="menu-image-url">Image URL</Label>
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
              Cancel
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending
                ? initialItem
                  ? "Saving..."
                  : "Creating..."
                : initialItem
                  ? "Save Changes"
                  : "Create Item"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

