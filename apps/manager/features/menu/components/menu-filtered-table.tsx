"use client"

import { useMemo } from "react"
import { useCurrentUser } from "@/features/auth/api/queries"
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert"
import { Badge } from "@/shared/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table"
import { AlertCircle, Clock, Eye, EyeOff } from "lucide-react"
import { useMenu } from "../api/queries"

interface MenuFilteredTableProps {
  categoryFilter?: string
  title: string
  description: string
}

const toSlug = (value: string) =>
  value.trim().toLowerCase().replace(/\s+/g, "-")

export function MenuFilteredTable({
  categoryFilter,
  title,
  description,
}: MenuFilteredTableProps) {
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const restaurantId = user?.restaurantId ?? null
  const menuQuery = useMenu(restaurantId)

  const filteredItems = useMemo(() => {
    const items = menuQuery.data ?? []
    if (!categoryFilter) {
      return items
    }

    return items.filter((item) => toSlug(item.category) === toSlug(categoryFilter))
  }, [categoryFilter, menuQuery.data])

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {isUserLoading || menuQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading menu items...</p>
          ) : null}
          {!isUserLoading && restaurantId === null ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Restaurant context missing</AlertTitle>
              <AlertDescription>
                The current manager account is not linked to a restaurant.
              </AlertDescription>
            </Alert>
          ) : null}
          {menuQuery.isError ? (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Could not load menu items</AlertTitle>
              <AlertDescription>
                The menu request failed. Refresh the page and try again.
              </AlertDescription>
            </Alert>
          ) : null}
          {!menuQuery.isLoading && !menuQuery.isError && restaurantId !== null ? (
            filteredItems.length > 0 ? (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Prep Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredItems.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {item.description}
                            </p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">{item.category}</Badge>
                        </TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            {item.preparationTime} min
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            {item.isAvailable ? (
                              <Eye className="h-3 w-3 text-success" />
                            ) : (
                              <EyeOff className="h-3 w-3 text-muted-foreground" />
                            )}
                            <span>
                              {item.isAvailable ? "Available" : "Unavailable"}
                            </span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No menu items matched this category.
              </p>
            )
          ) : null}
        </CardContent>
      </Card>
    </div>
  )
}

