'use client'

import { useMemo } from 'react'
import Image from "next/image"
import { Button } from '@/shared/ui/button'
import { Card, CardContent } from '@/shared/ui/card'
import { Skeleton } from '@/shared/ui/skeleton'
import { useRecommendations } from '../api/queries'
import { Sparkles, Plus } from 'lucide-react'
import type { RecommendedItem } from '../types'

function getTimeOfDay(): string {
  const hour = new Date().getHours()
  if (hour >= 6 && hour < 12) return 'morning'
  if (hour >= 12 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 22) return 'evening'
  return 'night'
}

interface RecommendationListProps {
  cartItemIds: number[]
  onAddToCart: (item: RecommendedItem) => void
}

function RecommendationSkeleton() {
  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Skeleton className="w-8 h-8 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[1, 2].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <Skeleton className="w-12 h-12 rounded-md" />
              <div className="flex-1 space-y-1">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

export function RecommendationList({ cartItemIds, onAddToCart }: RecommendationListProps) {
  const timeOfDay = useMemo(getTimeOfDay, [])
  const { data: recommendations, isLoading } = useRecommendations(cartItemIds, timeOfDay)

  if (isLoading) return <RecommendationSkeleton />
  if (!recommendations || recommendations.length === 0) return null

  return (
    <Card className="overflow-hidden border-primary/20 bg-gradient-to-r from-primary/5 to-transparent">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-primary">AI Recommendations</h3>
            <p className="text-sm text-muted-foreground">Based on your current order</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {recommendations.slice(0, 4).map((item) => (
            <div key={item.id} className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
              <Image
                src={item.image || '/placeholder.svg'}
                alt={item.name}
                width={48} height={48} className="w-12 h-12 object-cover rounded-md"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm leading-tight">{item.name}</h4>
                <p className="text-xs text-muted-foreground line-clamp-1">{item.reason}</p>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm font-semibold text-primary">${item.price}</span>
                  <Button
                    size="sm"
                    className="h-7 px-2 text-xs bg-primary text-primary-foreground hover:opacity-90"
                    onClick={() => onAddToCart(item)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 p-2 bg-amber-50 dark:bg-amber-950/30 rounded-md border border-amber-200 dark:border-amber-800">
          <p className="text-xs text-amber-800 dark:text-amber-200 text-center">
            <Sparkles className="w-3 h-3 inline mr-1" />
            AI-powered recommendation based on your current order
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
