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

const metricFormatter = new Intl.NumberFormat("en-US", {
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
          <h1 className="text-3xl font-semibold text-balance">Stock Management</h1>
          <p className="text-base text-muted-foreground">
            Track current inventory, tune thresholds, and review AI forecast signals.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="forecast-date" className="text-sm text-muted-foreground">
            Forecast date
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
          <AlertTitle>Loading stock</AlertTitle>
          <AlertDescription>
            Fetching inventory items for this restaurant.
          </AlertDescription>
        </Alert>
      ) : null}
      {!isUserLoading && restaurantId === null ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Restaurant context missing</AlertTitle>
          <AlertDescription>
            This manager account is not linked to a restaurant, so stock actions are unavailable.
          </AlertDescription>
        </Alert>
      ) : null}
      {stockQuery.isError ? (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Could not load stock</AlertTitle>
          <AlertDescription>
            The inventory API request failed. Refresh the page and try again.
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
                <p className="text-xs font-medium text-muted-foreground">Critical</p>
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
                <p className="text-xs font-medium text-muted-foreground">Low Stock</p>
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
                <p className="text-xs font-medium text-muted-foreground">Active Items</p>
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
                <p className="text-xs font-medium text-muted-foreground">Inventory Value</p>
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
                <CardTitle>Current Inventory</CardTitle>
                <p className="text-sm text-muted-foreground">
                  Use the threshold column for bulk edits, then save all pending changes together.
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
                  ? "Saving thresholds..."
                  : `Save ${changedThresholds.length} change${changedThresholds.length === 1 ? "" : "s"}`}
              </Button>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              <Input
                placeholder="Search stock items"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="critical">Critical</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="good">Good</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardHeader>
          <CardContent>
            <StockTable
              items={filteredItems}
              emptyMessage="No stock items match the current filters."
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
              <CardTitle>Selected Item</CardTitle>
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
                      <p className="text-xs font-medium text-muted-foreground">Current stock</p>
                      <p className="text-xl font-semibold tabular-nums">
                        {metricFormatter.format(selectedItem.currentStock)} {selectedItem.unit}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-secondary/30 p-4">
                      <p className="text-xs font-medium text-muted-foreground">Minimum threshold</p>
                      <p className="text-xl font-semibold tabular-nums">
                        {metricFormatter.format(selectedItem.minimumStock)} {selectedItem.unit}
                      </p>
                    </div>
                    <div className="rounded-xl border bg-secondary/30 p-4">
                      <p className="text-xs font-medium text-muted-foreground">Current gap</p>
                      <p className="text-xl font-semibold tabular-nums">
                        {metricFormatter.format(selectedItem.shortage)} {selectedItem.unit}
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select an inventory row to inspect forecast and restock details.
                </p>
              )}
            </CardContent>
          </Card>

          {selectedItem && !forecastQuery.isError ? (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BrainCircuit className="h-4 w-4 text-primary" />
                  AI Forecast
                </CardTitle>
              </CardHeader>
              <CardContent>
                {forecastQuery.isLoading ? (
                  <p className="text-sm text-muted-foreground">
                    Fetching AI guidance for {selectedItem.name}.
                  </p>
                ) : forecastQuery.data ? (
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {forecastQuery.data.summary}
                    </p>
                    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
                      <div className="rounded-xl border bg-secondary/30 p-4">
                        <p className="text-xs font-medium text-muted-foreground">Predicted demand</p>
                        <p className="text-lg font-semibold tabular-nums">
                          {forecastQuery.data.predictedDemand === null
                            ? "Unavailable"
                            : `${metricFormatter.format(forecastQuery.data.predictedDemand)} ${selectedItem.unit}`}
                        </p>
                      </div>
                      <div className="rounded-xl border bg-secondary/30 p-4">
                        <p className="text-xs font-medium text-muted-foreground">Suggested order</p>
                        <p className="text-lg font-semibold tabular-nums">
                          {forecastQuery.data.recommendedOrderQuantity === null
                            ? "Unavailable"
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
                    No forecast returned for this item.
                  </p>
                )}
              </CardContent>
            </Card>
          ) : selectedItem ? (
            <Card>
              <CardHeader>
                <CardTitle>AI Forecast</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  AI forecast is unavailable right now. Stock operations still work normally.
                </p>
              </CardContent>
            </Card>
          ) : null}

          <Card>
            <CardHeader>
              <CardTitle>Restock Update</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedItem ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="restock-quantity">Quantity to add</Label>
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
                    <Label htmlFor="restock-reason">Reason</Label>
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
                      placeholder="Optional receiving notes"
                      rows={4}
                    />
                  </div>
                  <Button
                    onClick={handleRestock}
                    disabled={createRestockOrder.isPending || restaurantId === null}
                    className="w-full"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {createRestockOrder.isPending ? "Saving restock..." : "Record restock"}
                  </Button>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Select an item first to add stock and log the replenishment reason.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
