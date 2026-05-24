'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
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
        'shadow-intensity'?: string
        exposure?: string
        'ar-scale'?: string
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
  const viewerRef = useRef<HTMLElement>(null)
  const [libStatus, setLibStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [libError, setLibError] = useState('')
  const [arError, setArError] = useState<string | null>(null)
  const [showDiagnostics, setShowDiagnostics] = useState(false)

  const isDev = process.env.NODE_ENV === 'development'

  useEffect(() => {
    let mounted = true
    import('@google/model-viewer')
      .then(() => {
        if (!mounted) return
        if (customElements.get('model-viewer')) {
          setLibStatus('ready')
        } else {
          setLibStatus('error')
          setLibError('model-viewer non enregistré après import')
        }
      })
      .catch((e) => {
        if (!mounted) return
        setLibStatus('error')
        setLibError(`Échec chargement librairie: ${e instanceof Error ? e.message : 'Erreur inconnue'}`)
      })
    return () => { mounted = false }
  }, [])

  const handleActivateAR = useCallback(() => {
    setArError(null)
    const el = viewerRef.current
    if (!el) {
      setArError('Visualiseur AR non initialisé. Rechargez la page.')
      return
    }
    if (typeof (el as any).activateAR === 'function') {
      try {
        ;(el as any).activateAR()
      } catch (e) {
        setArError(
          `Échec lancement AR: ${e instanceof Error ? e.message : 'Erreur inconnue'}. ` +
            'Vérifiez que Chrome et ARCore sont à jour.',
        )
      }
    } else {
      setArError(
        'AR non disponible sur cet appareil/navigateur. Android Chrome avec ARCore requis.',
      )
    }
  }, [])

  if (libStatus === 'loading') {
    return (
      <div
        className={cn(
          'flex h-[360px] w-full items-center justify-center rounded-xl border border-border bg-muted sm:h-[460px]',
          className,
        )}
      >
        <div className="text-center">
          <div className="mx-auto mb-2 h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent" />
          <p className="text-sm text-muted-foreground">Chargement AR…</p>
        </div>
      </div>
    )
  }

  if (libStatus === 'error') {
    return (
      <div
        className={cn(
          'flex h-[360px] w-full items-center justify-center rounded-xl border border-destructive/50 bg-destructive/5 p-4 sm:h-[460px]',
          className,
        )}
      >
        <div className="text-center">
          <p className="mb-1 text-sm font-medium text-destructive">AR indisponible</p>
          <p className="text-xs text-muted-foreground">{libError}</p>
          {isDev && (
            <p className="mt-2 text-xs text-muted-foreground">
              Vérifiez que <code className="rounded bg-muted px-1">@google/model-viewer</code> est installé dans
              package.json.
            </p>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className={cn('flex flex-col', className)}>
      <div className="relative h-[360px] w-full overflow-hidden rounded-xl border border-border bg-muted sm:h-[460px]">
        <model-viewer
          ref={viewerRef}
          src={src}
          alt={alt}
          ar
          camera-controls
          auto-rotate
          ar-modes="scene-viewer webxr quick-look"
          loading="lazy"
          reveal="auto"
          shadow-intensity="0.5"
          exposure="1"
          ar-scale="auto"
          className="h-full w-full"
        />
      </div>

      <div className="mt-3 flex flex-col gap-2">
        <button
          onClick={handleActivateAR}
          className="w-full cursor-pointer rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          Voir sur ma table
        </button>

        {arError && (
          <p className="text-center text-xs text-destructive">{arError}</p>
        )}

        <p className="text-center text-xs text-muted-foreground">
          Vous pouvez aussi utiliser le bouton AR intégré au visualiseur 3D ci-dessus.
        </p>
      </div>

      {isDev && (
        <DevDiagnostics
          src={src}
          alt={alt}
          libReady={libStatus === 'ready'}
        />
      )}
    </div>
  )
}

function DevDiagnostics({
  src,
  alt,
  libReady,
}: {
  src: string
  alt: string
  libReady: boolean
}) {
  const [open, setOpen] = useState(false)

  if (typeof window === 'undefined') return null

  const d = {
    modelSrc: src,
    alt,
    origin: window.location.origin,
    protocol: window.location.protocol,
    isHttps: window.location.protocol === 'https:',
    isAndroid: /Android/i.test(navigator.userAgent),
    isIOS: /iPhone|iPad|iPod/i.test(navigator.userAgent),
    isMobile: /Android|iPhone|iPad|iPod|webOS/i.test(navigator.userAgent),
    ua: navigator.userAgent.substring(0, 120),
  }

  return (
    <details
      className="mt-2 rounded-lg border border-border p-2 text-xs text-muted-foreground"
      open={open}
      onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
    >
      <summary className="cursor-pointer font-medium">🔧 Diagnostic AR (dev)</summary>
      <div className="mt-2 space-y-1">
        <p>
          Modèle: <code className="rounded bg-muted px-0.5">{d.modelSrc}</code>
        </p>
        <p>Nom: {d.alt}</p>
        <p>Origine: {d.origin}</p>
        <p>
          Protocole: {d.protocol}{' '}
          {d.isHttps
            ? '✅ HTTPS'
            : '⚠️ HTTP — AR peut ne pas fonctionner sans HTTPS'}
        </p>
        <p>
          Mobile: {d.isMobile ? '✅' : '❌ — AR nécessite un appareil mobile'}
        </p>
        <p>Android: {d.isAndroid ? '✅' : '❌'}</p>
        <p>
          iOS: {d.isIOS ? '⚠️ iOS nécessite USDZ (non configuré)' : '❌'}
        </p>
        <p>Librairie chargée: {libReady ? '✅' : '❌'}</p>
        <p className="font-medium text-warning">
          Android AR nécessite: Chrome, ARCore / Google Play Services pour AR, HTTPS, et un fichier
          GLB valide.
        </p>
        {d.isIOS && (
          <p className="font-medium text-warning">
            iOS QuickLook nécessite USDZ. Aucun USDZ n&apos;est configuré pour le moment.
          </p>
        )}
        {!d.isAndroid && (
          <p>
            Vérifiez que le fichier est accessible:{' '}
            <code className="rounded bg-muted px-0.5">{d.origin}{d.modelSrc}</code>
          </p>
        )}
        <p className="truncate opacity-60">UA: {d.ua}</p>
      </div>
    </details>
  )
}
