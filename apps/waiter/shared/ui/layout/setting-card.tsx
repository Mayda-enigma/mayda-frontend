"use client"

import * as React from "react"

import { cn } from "@/shared/utils"
import { Button } from "@/shared/ui/button"

interface SettingCardProps {
  title: string
  description?: string
  control?: React.ReactNode
  showSave?: boolean
  saveLabel?: string
  saveDisabled?: boolean
  className?: string
}

export function SettingCard({
  title,
  description,
  control,
  showSave = false,
  saveLabel = "Save",
  saveDisabled = true,
  className,
}: SettingCardProps) {
  return (
    <section
      className={cn(
        "border-t pt-6 first:border-t-0 first:pt-0",
        className,
      )}
    >
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8">
        <div className="space-y-1 md:max-w-sm">
          <h3 className="text-base font-semibold">{title}</h3>
          {description ? (
            <p className="text-base text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {control ? (
          <div className="flex items-center md:shrink-0">{control}</div>
        ) : null}
      </div>

      {showSave ? (
        <div className="mt-4 flex items-center justify-end border-t pt-3">
          <Button size="sm" disabled={saveDisabled} type="button">
            {saveLabel}
          </Button>
        </div>
      ) : null}
    </section>
  )
}
