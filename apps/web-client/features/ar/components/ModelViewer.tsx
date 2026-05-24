'use client'

import { useEffect, useState } from 'react'
import type * as React from 'react'
import { cn } from '@/shared/utils'

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'model-viewer': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        src?: string
        alt?: string
        ar?: boolean
        'camera-controls'?: boolean
        'auto-rotate'?: boolean
        'ar-modes'?: string
        loading?: 'lazy' | 'eager'
        reveal?: 'auto' | 'manual'
      }
    }
  }
}

interface ModelViewerProps {
  src: string
  alt: string
  className?: string
}

export function ModelViewer({ src, alt, className }: ModelViewerProps) {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    let isMounted = true

    import('@google/model-viewer')
      .then(() => {
        if (isMounted) {
          setIsReady(true)
        }
      })
      .catch(() => {
        if (isMounted) {
          setIsReady(false)
        }
      })

    return () => {
      isMounted = false
    }
  }, [])

  return (
    <div
      className={cn(
        'relative h-[360px] w-full overflow-hidden rounded-xl border border-border bg-muted sm:h-[460px]',
        className,
      )}
    >
      {isReady ? (
        <model-viewer
          src={src}
          alt={alt}
          ar
          camera-controls
          auto-rotate
          ar-modes="webxr scene-viewer quick-look"
          loading="lazy"
          reveal="auto"
          className="h-full w-full"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm text-muted-foreground">
          Chargement AR...
        </div>
      )}
    </div>
  )
}
