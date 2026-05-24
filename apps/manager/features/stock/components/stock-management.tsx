"use client"

import { useDeferredValue, useEffect, useState } from "react"
import { useCurrentUser } from "@/features/auth/api/queries"
import { Alert, AlertDescription, AlertTitle } from "@/shared/ui/alert"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
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
import { useToast } from "@/shared/ui/use-toast"
import {
  AlertCircle,
  BrainCircuit,
  Package,
  Save,
  ShoppingCart,
  TrendingDown,
  TriangleAlert,
} from "lucide-react"
import {
  useCreateRestockOrder,
  useUpdateThreshold,
} from "../api/mutations"
import { useStock, useStockForecast } from "../api/queries"
import { StockTable } from "./stock-table"
import type { StockItem } from "../types"

const today = new Date().toISOString().slice(0, 10)

const metricFormatter = new Intl.NumberFormat("fr-DZ", {
  maximumFractionDigits: 2,
})

export function StockManagement() {
  const { toast } = useToast()
  const { data: user, isLoading: isUserLoading } = useCurrentUser()
  const restaurantId = user?.restaurantId ?? null

  const stockQuery = useStock(restaurantId)
  const stockItems = stockQuery.data ?? []

  const [searchTerm, setSearchTerm] = useState("")
  const deferredSearchTerm = useDeferredValue(searchTerm)
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [forecastDate, setForecastDate] = useState(today)
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null)
  const [thresholdDrafts, setThresholdDrafts] = useState<Record<string, string>>({})
  const [restockQuantity, setRestockQuantity] = useState("")
  const [restockReason, setRestockReason] = useState("Manual replenishment")
  const [restockNotes, setRestockNotes] = useState("")

  const updateThreshold = useUpdateThreshold(restaurantId ?? 0)
  const createRestockOrder = useCreateRestockOrder(restaurantId ?? 0)

  const categories = Array.from(
    new Set(stockItems.map((item) => item.category)),
  ).sort()

  const normalizedSearch = deferredSearchTerm.trim().toLowerCase()
  const filteredItems = stockItems.filter((item) => {
    const matchesSearch =
      normalizedSearch.length === 0 ||
      item.name.toLowerCase().includes(normalizedSearch) ||
      item.description.toLowerCase().includes(normalizedSearch)
    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter
    const matchesStatus = statusFilter === "all" || item.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  useEffect(() => {
    if (filteredItems.length === 0) {
      setSelectedItemId(null)
      return
    }

    if (
      selectedItemId === null ||
      !filteredItems.some((item) => item.id === selectedItemId)
    ) {
      setSelectedItemId(filteredItems[0].id)
    }
  }, [filteredItems, selectedItemId])

  const selectedItem =
    filteredItems.find((item) => item.id === selectedItemId) ?? null

  const forecastQuery = useStockForecast(
    selectedItem?.name ?? null,
    forecastDate,
    restaurantId !== null,
  )

  const changedThresholds = filteredItems
    .map((item) => {
      const draft = thresholdDrafts[item.id]
      if (draft === undefined) {
        return null
      }

      if (draft.trim().length === 0) {
        return null
      }

      const value = Number(draft)
      if (!Number.isFinite(value) || value < 0 || value === item.minimumStock) {
        return null
      }

      return { id: item.id, minimumStock: value }
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  const pendingRestockId =
    createRestockOrder.isPending && createRestockOrder.variables
      ? createRestockOrder.variables.itemId
      : null

  const criticalCount = stockItems.filter((item) => item.status === "critical").length
  const lowCount = stockItems.filter((item) => item.status === "low").length
  const totalValue = stockItems.reduce((sum, item) => sum + item.totalValue, 0)

  const handleThresholdDraftChange = (id: string, value: string) => {
    setThresholdDrafts((current) => ({
      ...current,
      [id]: value,
    }))
  }

  const handleBulkThresholdSave = async () => {
    if (changedThresholds.length === 0) {
      return
    }

    try {
      for (const item of changedThresholds) {
        await updateThreshold.mutateAsync({
          id: item.id,
          minimumStock: item.minimumStock,
        })
      }

      setThresholdDrafts((current) => {
        const next = { ...current }
        changedThresholds.forEach((item) => {
          delete next[item.id]
        })
        return next
      })

      toast({
        title: "Thresholds updated",
        description: `${changedThresholds.length} stock thresholds were saved.`,
      })
    } catch {
      toast({
        title: "Threshold update failed",
        description: "One or more threshold changes could not be saved.",
        variant: "destructive",
      })
    }
  }

  const handleSelectItem = (item: StockItem) => {
    setSelectedItemId(item.id)
    if (restockQuantity.length === 0 && item.shortage > 0) {
      setRestockQuantity(String(item.shortage))
    }
  }

  const handleRestock = async () => {
    if (!selectedItem) {
      return
    }

    const quantity = Number(restockQuantity)
    if (!Number.isFinite(quantity) || quantity <= 0) {
      toast({
        title: "Invalid quantity",
        description: "Enter a positive quantity before restocking.",
        variant: "destructive",
      })
      return
    }

    if (restockReason.trim().length === 0) {
      toast({
        title: "Reason required",
        description: "Add a short reason for the stock update.",
        variant: "destructive",
      })
      return
    }

    try {
      await createRestockOrder.mutateAsync({
        itemId: selectedItem.id,
        quantity,
        reason: restockReason,
        notes: restockNotes,
      })

      setRestockQuantity("")
      setRestockNotes("")

      toast({
        title: "Restock saved",
        description: `${selectedItem.name} increased by ${quantity} ${selectedItem.unit}.`,
      })
    } catch {
      toast({
        title: "Restock failed",
        description: "The stock update could not be recorded.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl font-semibold text-balance">Gestion des stocks</h1>
          <p className="text-base text-muted-foreground">
            Suivez l'inventaire actuel, ajustez les seuils et consultez les prévisions IA.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="forecast-date" className="text-sm text-muted-foreground">
            Date de prévision
          </Label>
          <Input
            id="forecast-date"
            type="date"
            value={forecastDate}
            onChange={(event) => setForecastDate(event.target.value)}
            className="w-44"
          />
        </div>
      </div>

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
            Ce compte gestionnaire n'est lié à aucun restaurant, les actions sur les stocks sont donc indisponibles.
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

      <div className="grid gap-6 md:grid-cols-3 xl:grid-cols-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-md bg-destructive/15 text-destructive">
                <TriangleAlert className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Critique</p>
                <p className="text-2xl font-semibold tabular-nums">{criticalCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-md bg-warning/15 text-warning">
                <TrendingDown className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Stock faible</p>
                <p className="text-2xl font-semibold tabular-nums">{lowCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-md bg-primary/15 text-primary">
                <Package className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Articles actifs</p>
                <p className="text-2xl font-semibold tabular-nums">{stockItems.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <span className="grid size-10 place-items-center rounded-md bg-success/15 text-success">
                <ShoppingCart className="size-5" />
              </span>
              <div>
                <p className="text-xs font-medium text-muted-foreground">Valeur de l'inventaire</p>
                <p className="text-2xl font-semibold tabular-nums">
                  {metricFormatter.format(totalValue)}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)]">
        <Card>
          <CardHeader className="gap-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-1">
                <CardTitle>Inventaire actuel</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Utilisez la colonne des seuils pour les modifications groupées, puis enregistrez toutes les modifications en attente ensemble.
                </p>
              </div>
              <Button
                onClick={handleBulkThresholdSave}
                disabled={
                  changedThresholds.length === 0 || updateThreshold.isPending || restaurantId === null
                }
              >
                <Save className="h-4 w-4" />
                {updateThreshold.isPending
                    ? "Enregistrement des seuils..."
                    : `Enregistrer ${changedThresholds.length} modification${changedThresholds.length === 1 ? "" : "s"}`}
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <Input
                placeholder="Rechercher des articles"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Catégorie" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Toutes les catégories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Statut" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les statuts</SelectItem>
                  <SelectItem value="critical">Critique</SelectItem>
                  <SelectItem value="low">Faible</SelectItem>
                  <SelectItem value="good">Bon</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <StockTable
              items={filteredItems}
              emptyMessage="Aucun article ne correspond aux filtres actuels."
              thresholdDrafts={thresholdDrafts}
              onThresholdChange={handleThresholdDraftChange}
              onSelectItem={handleSelectItem}
              selectedItemId={selectedItemId}
              onRestock={handleSelectItem}
              restockingId={pendingRestockId}
              editableThresholds
            />
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Article sélectionné</CardTitle>
            </CardHeader>
            <CardContent>
              {selectedItem ? (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <p className="font-medium">{selectedItem.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedItem.category} · {selectedItem.supplier}
                    </p>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                    <div className="rounded-xl border bg-secondary/30 p-4">
                      <p className="text-xs font-medium text-muted-foreground">Stock actuel</p>
                      <p className="text-xl font-semibold tabular-nums">
                        {metricFormatter.format(selectedItem.currentStock)} {selectedItem.unit}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-secondary/30 p-4">
                      <p className="text-xs font-medium text-muted-foreground">Seuil minimum</p>
                      <p className="text-xl font-semibold tabular-nums">
                        {metricFormatter.format(selectedItem.minimumStock)} {selectedItem.unit}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-secondary/30 p-4">
                      <p className="text-xs font-medium text-muted-foreground">Écart actuel</p>
                      <p className="text-xl font-semibold tabular-nums">
                        {metricFormatter.format(selectedItem.shortage)} {selectedItem.unit}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Sélectionnez une ligne d'inventaire pour voir les prévisions et les détails de réapprovisionnement.
                </p>
              )}
            </CardContent>
          </Card>

          {selectedItem && !forecastQuery.isError ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4 text-primary" />
                  Prévision IA
                </CardTitle>
              </CardHeader>
              <CardContent>
                {forecastQuery.isLoading ? (
                  <p className="text-sm text-muted-foreground">
                    Récupération des conseils IA pour {selectedItem.name}.
                  </p>
                ) : forecastQuery.data ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {forecastQuery.data.summary}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                      <div className="rounded-xl border bg-secondary/30 p-4">
                        <p className="text-xs font-medium text-muted-foreground">Demande prévue</p>
                        <p className="text-lg font-semibold tabular-nums">
                          {forecastQuery.data.predictedDemand === null
                            ? "Indisponible"
                            : `${metricFormatter.format(forecastQuery.data.predictedDemand)} ${selectedItem.unit}`}
                        </p>
                      </div>
                      <div className="rounded-xl border bg-secondary/30 p-4">
                        <p className="text-xs font-medium text-muted-foreground">Commande suggérée</p>
                        <p className="text-lg font-semibold tabular-nums">
                          {forecastQuery.data.recommendedOrderQuantity === null
                            ? "Indisponible"
                            : `${metricFormatter.format(forecastQuery.data.recommendedOrderQuantity)} ${selectedItem.unit}`}
                        </p>
                      </div>
                    </div>
                    {forecastQuery.data.confidence || forecastQuery.data.urgency ? (
                      <p className="text-xs text-muted-foreground">
                        {[forecastQuery.data.confidence, forecastQuery.data.urgency]
                          .filter(Boolean)
                          .join(" · ")}
                      </p>
                    ) : null}
                    {forecastQuery.data.details.length > 0 ? (
                      <div className="space-y-2 rounded-xl border bg-secondary/20 p-4">
                        {forecastQuery.data.details.map((detail) => (
                          <p key={detail} className="text-xs text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Aucune prévision retournée pour cet article.
                  </p>
                )}
              </CardContent>
            </Card>
          ) : selectedItem ? (
            <Card>
              <CardHeader>
                <CardTitle>Prévision IA</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  La prévision IA est actuellement indisponible. Les opérations de stock fonctionnent normalement.
                </p>
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle>Mise à jour du réapprovisionnement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedItem ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="restock-quantity">Quantité à ajouter</Label>
                    <Input
                      id="restock-quantity"
                      type="number"
                      min="0"
                      step="0.01"
                      value={restockQuantity}
                      onChange={(event) => setRestockQuantity(event.target.value)}
                      placeholder={`In ${selectedItem.unit}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restock-reason">Motif</Label>
                    <Input
                      id="restock-reason"
                      value={restockReason}
                      onChange={(event) => setRestockReason(event.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="restock-notes">Notes</Label>
                    <Textarea
                      id="restock-notes"
                      value={restockNotes}
                      onChange={(event) => setRestockNotes(event.target.value)}
                      placeholder="Notes de réception optionnelles"
                      rows={4}
                    />
                  </div>
                  <Button
                    onClick={handleRestock}
                    disabled={createRestockOrder.isPending || restaurantId === null}
                    className="w-full"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {createRestockOrder.isPending ? "Enregistrement du réapprovisionnement..." : "Enregistrer le réapprovisionnement"}
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Sélectionnez d'abord un article pour ajouter du stock et enregistrer le motif de réapprovisionnement.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
