"use client"

import { useCurrentUser } from "@/features/auth/api/queries"
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { AlertCircle } from "lucide-react"
import { useStock } from "../api/queries"
import { StockTable } from "./stock-table"
import type { StockStatus } from "../types"

interface StockFilteredTableProps {
  statusFilter?: StockStatus
  title: string
  description: string
}

export function StockFilteredTable({
  statusFilter,
  title,
  description,
}: StockFilteredTableProps) {
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const restaurantId = user?.restaurantId ?? null
  const stockQuery = useStock(restaurantId)

  const stockItems = stockQuery.data ?? []
  const filteredItems = statusFilter
    ? stockItems.filter((item) => item.status === statusFilter)
    : stockItems

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      {isUserLoading || stockQuery.isLoading ? (
        <Alert>
          <AlertTitle>Chargement des stocks</AlertTitle>
          <AlertDescription>
            Récupération des articles d'inventaire pour ce restaurant.
          </AlertDescription>
        </Alert>
      ) : null}
      {!isUserLoading && restaurantId === null ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Contexte du restaurant manquant</AlertTitle>
          <AlertDescription>
            Ce compte gestionnaire n'est lié à aucun restaurant, les articles de stock ne peuvent donc pas être affichés.
          </AlertDescription>
        </Alert>
      ) : null}
      {stockQuery.isError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Impossible de charger les stocks</AlertTitle>
          <AlertDescription>
            La requête API d'inventaire a échoué. Actualisez la page et réessayez.
          </AlertDescription>
        </Alert>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <StockTable
            items={filteredItems}
            emptyMessage="Aucun article de stock ne correspond à cette vue."
          />
        </CardContent>
      </Card>
    </div>
  )
}
