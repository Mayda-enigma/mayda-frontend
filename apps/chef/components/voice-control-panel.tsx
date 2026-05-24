"use client"

import { useState } from "react"
import { Button } from "@/shared/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card"
import { Badge } from "@/shared/ui/badge"
import { Mic, MicOff, Volume2, HelpCircle, Loader2 } from "lucide-react"
import { useVoiceCommands, useVoiceRecording, useTranscribe } from "@/features/voice"

interface VoiceControlPanelProps {
  onOrderAction?: (orderId: string, action: string) => void
  onNavigate?: (path: string) => void
}

export function VoiceControlPanel({ onOrderAction, onNavigate }: VoiceControlPanelProps) {
  const [showCommands, setShowCommands] = useState(false)
  const [backendTranscript, setBackendTranscript] = useState<string>("")

  const voiceCommands = [
    {
      command: "commencer commande",
      action: () => onOrderAction?.("current", "start"),
      description: "Commencer la commande en cours",
    },
    {
      command: "marquer prêt",
      action: () => onOrderAction?.("current", "ready"),
      description: "Marquer la commande comme prête",
    },
    {
      command: "aller au tableau de bord",
      action: () => onNavigate?.("/"),
      description: "Naviguer vers le tableau de bord",
    },
    {
      command: "aller au stock",
      action: () => onNavigate?.("/stock"),
      description: "Naviguer vers la page de stock",
    },
    {
      command: "aller aux analyses",
      action: () => onNavigate?.("/analytics"),
      description: "Naviguer vers la page d'analyses",
    },
    {
      command: "trier par temps",
      action: () => {
        const sortButton = document.querySelector('[data-sort="time"]') as HTMLButtonElement
        sortButton?.click()
      },
      description: "Trier les commandes par temps",
    },
    {
      command: "trier par complexité",
      action: () => {
        const sortButton = document.querySelector('[data-sort="complexity"]') as HTMLButtonElement
        sortButton?.click()
      },
      description: "Trier les commandes par complexité",
    },
    {
      command: "afficher aide",
      action: () => setShowCommands(true),
      description: "Afficher l'aide des commandes vocales",
    },
    {
      command: "cacher aide",
      action: () => setShowCommands(false),
      description: "Cacher l'aide des commandes vocales",
    },
  ]

  const { isListening, isSupported, lastCommand, startListening, stopListening, speak } = useVoiceCommands({
    commands: voiceCommands,
    enabled: true,
  })

  const {
    isRecording,
    isSupported: isRecordingSupported,
    error: recordingError,
    startRecording,
    stopRecording,
  } = useVoiceRecording()

  const { mutateAsync: transcribe, isPending: isTranscribing } = useTranscribe()

  const matchCommand = (transcript: string) => {
    const lower = transcript.toLowerCase().trim()
    const matched = voiceCommands.find(
      (cmd) => lower.includes(cmd.command.toLowerCase()) || cmd.command.toLowerCase().includes(lower),
    )
    if (matched) {
      matched.action()
            speak(`Commande exécutée : ${matched.description}`)
    }
    return matched?.command ?? null
  }

  const handleRecordAndTranscribe = async () => {
    if (isRecording) {
      const blob = await stopRecording()
      if (blob) {
        try {
          const result = await transcribe(blob)
          setBackendTranscript(result.text)
          matchCommand(result.text)
        } catch {
          setBackendTranscript("Échec de la transcription — vérifiez la connexion au serveur")
        }
      }
    } else {
      await startRecording()
    }
  }

  if (!isSupported && !isRecordingSupported) {
    return (
      <Card className="bg-card border-border m-8">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MicOff className="w-4 h-4" />
            <span className="text-sm">Commandes vocales non prises en charge dans ce navigateur</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="m-8 space-y-4">
      <Card className="bg-card border-border">
        <CardContent className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isSupported && (
                <Button
                  onClick={isListening ? stopListening : startListening}
                  variant={isListening ? "destructive" : "default"}
                  size="sm"
                  className={isListening ? "bg-red-600 hover:bg-red-700" : "bg-orange-500 hover:bg-orange-600"}
                >
                  {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                  {isListening ? "Arrêter l'écoute" : "Contrôle vocal"}
                </Button>
              )}

              {isRecordingSupported && (
                <Button
                  onClick={handleRecordAndTranscribe}
                  variant={isRecording ? "destructive" : "outline"}
                  size="sm"
                  disabled={isTranscribing}
                >
                  {isTranscribing ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : isRecording ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-pulse" />
                  ) : (
                    <Mic className="w-4 h-4 mr-2" />
                  )}
                  {isTranscribing ? "Transcription..." : isRecording ? "Arrêter & Transcrire" : "Enregistrer"}
                </Button>
              )}

              {isListening && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-destructive rounded-full" />
                  <span className="text-sm text-muted-foreground">Écoute...</span>
                </div>
              )}

              {isRecording && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">Enregistrement...</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => speak("Le contrôle vocal est prêt. Dites une commande pour commencer.")}
                className="text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <Volume2 className="w-4 h-4" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowCommands(!showCommands)}
                className="text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                <HelpCircle className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {lastCommand && (
            <div className="p-2 bg-muted rounded text-sm">
              <span className="text-muted-foreground">Reconnaissance vocale : </span>
              <span className="text-orange-500">&quot;{lastCommand}&quot;</span>

            </div>
          )}

          {backendTranscript && (
            <div className="p-2 bg-muted rounded text-sm">
              <span className="text-muted-foreground">Transcription serveur : </span>
              <span className="text-blue-500">&quot;{backendTranscript}&quot;</span>
            </div>
          )}

          {recordingError && (
            <div className="p-2 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded text-sm text-red-600 dark:text-red-400">
              {recordingError}
            </div>
          )}
        </CardContent>
      </Card>

      {showCommands && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-primary text-lg">Commandes Vocales</CardTitle>
            <CardDescription>Commandes vocales disponibles pour une utilisation mains-libres</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {voiceCommands.map((cmd, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div>
                    <Badge variant="outline" className="text-xs mb-1">
                      &quot;{cmd.command}&quot;
                    </Badge>
                    <p className="text-sm text-muted-foreground">{cmd.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-primary/10 border border-primary/20 rounded">
              <h4 className="text-primary font-medium mb-2">Conseils pour une meilleure reconnaissance :</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Parlez clairement et à un rythme normal</li>
                <li>• Utilisez les phrases de commande exactes</li>
                <li>• Assurez-vous que les autorisations du microphone sont accordées</li>
                <li>• Minimisez le bruit de fond</li>
                <li>• Utilisez &quot;Enregistrer&quot; pour une meilleure précision via la transcription serveur</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
