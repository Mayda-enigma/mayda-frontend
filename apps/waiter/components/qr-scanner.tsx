"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Input } from "@/shared/ui/input"
import { AlertTriangle, CheckCircle, Camera, CameraOff, Loader2 } from "lucide-react"
import { cn } from "@/shared/utils"
import { tableService } from "@/features/tables"
import { useCheckinTable } from "@/features/tables/api/mutations"

import { useRouter } from "next/navigation"

export function QRScanner() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [scanResult, setScanResult] = useState<{ success: boolean; message: string } | null>(null)
  const [manualCode, setManualCode] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const checkinTable = useCheckinTable()

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      })
      streamRef.current = stream
      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }
      setCameraActive(true)
      setScanResult(null)
    } catch {
      setScanResult({ success: false, message: "Accès caméra refusé ou non disponible" })
    }
  }, [])

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setCameraActive(false)
  }, [])

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [])

  const processScan = async (code: string) => {
    setIsProcessing(true)
    try {
      const table = await tableService.qrLookup(code)
      await checkinTable.mutateAsync(table.id)
      setScanResult({ success: true, message: `Enregistré à la table ${table.number}` })
      setTimeout(() => router.push(`/table/${table.id}`), 1500)
    } catch (err: any) {
      const msg = err?.body?.detail || err?.message || "Échec du traitement du QR code"
      setScanResult({ success: false, message: msg })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleManualSubmit = () => {
    if (manualCode.trim()) {
      processScan(manualCode.trim())
      setManualCode("")
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 space-y-6">
      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-center">Scanner QR table</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden flex items-center justify-center">
            {cameraActive ? (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full h-full object-cover"
                onLoadedMetadata={() => videoRef.current?.play()}
              />
            ) : (
              <div className="text-center text-muted-foreground">
                <Camera className="h-12 w-12 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Caméra éteinte</p>
              </div>
            )}
          </div>

          <div className="flex gap-2">
            {cameraActive ? (
              <Button onClick={stopCamera} variant="outline" className="flex-1 bg-transparent h-12">
                <CameraOff className="h-5 w-5 mr-2" />
                Arrêter caméra
              </Button>
            ) : (
              <Button onClick={startCamera} className="flex-1 hover:-dark text-white h-12">
                <Camera className="h-5 w-5 mr-2" />
                Démarrer caméra
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      <Card className="max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-center">
            Entrer le code table
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input
            placeholder="ex: MaydaDowntown-T01"
            value={manualCode}
            onChange={(e) => setManualCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleManualSubmit()}
            className="text-center text-sm h-11"
          />
          <Button
            onClick={handleManualSubmit}
            disabled={!manualCode.trim() || isProcessing}
            className="w-full hover:-dark text-white h-11"
          >
            {isProcessing ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
            Enregistrer
          </Button>
        </CardContent>
      </Card>

      {scanResult && (
        <Card className={cn("max-w-md mx-auto", scanResult.success ? "border-green-500" : "border-red-500")}>
          <CardContent className="p-4 flex items-center gap-3">
            {scanResult.success ? (
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
            ) : (
              <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0" />
            )}
            <p className={cn("text-sm", scanResult.success ? "text-green-700" : "text-red-700")}>
              {scanResult.message}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
