"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Camera, Flashlight, FlashlightOff, Hash, CheckCircle, AlertCircle, Scan } from "lucide-react"
import { cn } from "@/lib/utils"

interface ScanResult {
  tableNumber: string
  success: boolean
  timestamp: Date
}

export function QRScanner() {
  const [isScanning, setIsScanning] = useState(false)
  const [flashlightOn, setFlashlightOn] = useState(false)
  const [manualEntry, setManualEntry] = useState("")
  const [scanResult, setScanResult] = useState<ScanResult | null>(null)
  const [showManualInput, setShowManualInput] = useState(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const startCamera = async () => {
    try {
      setCameraError(null)
      console.log("[v0] Starting camera...")
      setIsScanning(true)
      await new Promise((resolve) => setTimeout(resolve, 100))
      if (!videoRef.current) {
        console.error("[v0] Video ref is still null after waiting")
        setCameraError("Camera display not available")
        setIsScanning(false)
        return
      }
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "environment", // Use back camera
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      })
      console.log("[v0] Camera stream obtained:", stream)
      console.log("[v0] Setting video source...")
      videoRef.current.srcObject = stream
      streamRef.current = stream
      videoRef.current.onloadedmetadata = () => {
        console.log("[v0] Video metadata loaded, starting playback...")
        videoRef.current
          ?.play()
          .then(() => {
            console.log("[v0] Video playback started successfully")
          })
          .catch((error) => {
            console.error("[v0] Error starting video playback:", error)
            setCameraError("Failed to start video playback")
          })
      }
      videoRef.current.onerror = (error) => {
        console.error("[v0] Video element error:", error)
        setCameraError("Video display error")
      }
    } catch (error) {
      console.error("[v0] Error accessing camera:", error)
      setCameraError("Camera access denied or not available")
      setIsScanning(false)
      setShowManualInput(true)
    }
  }

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop())
      streamRef.current = null
    }
    setIsScanning(false)
    setFlashlightOn(false)
  }

  const toggleFlashlight = async () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0]
      if (videoTrack && "torch" in videoTrack.getCapabilities()) {
        try {
          await videoTrack.applyConstraints({
            advanced: [{ torch: !flashlightOn } as any],
          })
          setFlashlightOn(!flashlightOn)
        } catch (error) {
          console.error("Error toggling flashlight:", error)
        }
      }
    }
  }

  const simulateScan = (tableNumber: string) => {
    const success = Math.random() > 0.1
    setScanResult({
      tableNumber,
      success,
      timestamp: new Date(),
    })
    if (success) {
      setTimeout(() => {
        stopCamera()
        setScanResult(null)
      }, 2000)
    }
  }

  const handleManualSubmit = () => {
    if (manualEntry.trim()) {
      simulateScan(manualEntry.trim())
      setManualEntry("")
    }
  }

  useEffect(() => {
    return () => {
      stopCamera()
    }
  }, [])

  return (
    <div className="p-2 sm:p-3 space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg sm:text-xl font-heading text-foreground">Scanner</h2>
          <p className="text-xs text-muted-foreground">Scan table QR code or NFC tag</p>
        </div>
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-0 flex items-center justify-center">
          {isScanning ? (
            <div className="relative aspect-square bg-black rounded-lg overflow-hidden">
              {cameraError ? (
                <div className="w-full h-full flex flex-col items-center justify-center text-white p-6">
                  <AlertCircle className="h-12 w-12 text-red-400 mb-3" />
                  <h3 className="text-base font-semibold mb-2">Camera Error</h3>
                  <p className="text-sm text-center mb-4">{cameraError}</p>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      setIsScanning(false)
                      setCameraError(null)
                      setShowManualInput(true)
                    }}
                    className="h-9 text-sm"
                  >
                    Use Manual Entry
                  </Button>
                </div>
              ) : (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                    style={{ transform: "scaleX(-1)" }}
                    onLoadedData={() => console.log("[v0] Video data loaded")}
                    onPlay={() => console.log("[v0] Video started playing")}
                    onError={(e) => {
                      console.error("[v0] Video error:", e)
                      setCameraError("Video playback error")
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative">
                      <div className="w-48 h-48 sm:w-56 sm:h-56 border-2 border-white/50 rounded-lg relative">
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg" />
                        <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg" />
                        <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg" />
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg" />
                        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent animate-pulse" />
                      </div>
                      <p className="text-white text-center mt-3 text-xs">Position QR code within the frame</p>
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex items-center gap-2">
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={toggleFlashlight}
                      className="bg-black/50 text-white border-white/20 hover:bg-black/70 h-8 px-2 text-xs"
                    >
                      {flashlightOn ? <FlashlightOff className="h-3 w-3" /> : <Flashlight className="h-3 w-3" />}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={stopCamera}
                      className="bg-black/50 text-white border-white/20 hover:bg-black/70 h-8 px-2 text-xs"
                    >
                      Stop
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => simulateScan("T0" + Math.floor(Math.random() * 9 + 1))}
                      className="bg-primary/80 text-primary-foreground hover:bg-primary h-8 px-2 text-xs"
                    >
                      <Scan className="h-3 w-3 mr-1" />
                      Demo Scan
                    </Button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <div className="aspect-square bg-muted rounded-lg flex flex-col items-center justify-center p-6 text-center max-h-[50rem]">
              <Camera className="h-12 w-12 text-muted-foreground mb-3" />
              <h3 className="font-semibold text-base mb-2">Ready to Scan</h3>
              <p className="text-xs text-muted-foreground mb-4">
                Point your camera at a table QR code or NFC tag to get started
              </p>
              <Button onClick={startCamera} className="mb-3 h-9 text-sm">
                <Camera className="h-3 w-3 mr-1.5" />
                Start Camera
              </Button>
              <Button variant="outline" onClick={() => setShowManualInput(!showManualInput)} className="h-9 text-sm">
                <Hash className="h-3 w-3 mr-1.5" />
                Manual Entry
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {showManualInput && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Manual Table Entry</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                placeholder="Enter table number (e.g., T01, T15)"
                value={manualEntry}
                onChange={(e) => setManualEntry(e.target.value.toUpperCase())}
                onKeyPress={(e) => e.key === "Enter" && handleManualSubmit()}
                className="flex-1 h-9 text-sm"
              />
              <Button onClick={handleManualSubmit} disabled={!manualEntry.trim()} className="h-9 text-sm">
                Submit
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">Use this if camera scanning is not available</p>
          </CardContent>
        </Card>
      )}

      {scanResult && (
        <Card className={cn("border-2", scanResult.success ? "border-green-500" : "border-red-500")}>
          <CardContent className="p-3">
            <div className="flex items-center gap-2">
              {scanResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertCircle className="h-4 w-4 text-red-500" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-medium">{scanResult.success ? "Scan Successful!" : "Scan Failed"}</h3>
                  <Badge variant={scanResult.success ? "default" : "destructive"} className="text-xs">
                    {scanResult.tableNumber}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground">
                  {scanResult.success ? "Opening table session..." : "Please try scanning again or use manual entry"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recent Scans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1.5">
            {["T03", "T07", "T12"].map((table, index) => (
              <div
                key={table}
                className="flex items-center justify-between py-1.5 border-b border-border last:border-0"
              >
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="text-xs">
                    {table}
                  </Badge>
                  <span className="text-xs">Table {table.slice(1)}</span>
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(Date.now() - index * 300000).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
