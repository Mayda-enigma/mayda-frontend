"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Mic, MicOff, Volume2, HelpCircle } from "lucide-react"
import { useVoiceCommands } from "@/hooks/use-voice-commands"
import { useI18n } from "./i18n-provider"

interface VoiceControlPanelProps {
  onOrderAction?: (orderId: string, action: string) => void
  onNavigate?: (path: string) => void
}

export function VoiceControlPanel({ onOrderAction, onNavigate }: VoiceControlPanelProps) {
  const [showCommands, setShowCommands] = useState(false)
  const { t } = useI18n()

  const voiceCommands = [
    {
      command: "start order",
      action: () => onOrderAction?.("current", "start"),
      description: "Start the current order",
    },
    {
      command: "mark ready",
      action: () => onOrderAction?.("current", "ready"),
      description: "Mark current order as ready",
    },
    {
      command: "go to dashboard",
      action: () => onNavigate?.("/"),
      description: "Navigate to dashboard",
    },
    {
      command: "go to stock",
      action: () => onNavigate?.("/stock"),
      description: "Navigate to stock page",
    },
    {
      command: "go to analytics",
      action: () => onNavigate?.("/analytics"),
      description: "Navigate to analytics page",
    },
    {
      command: "sort by time",
      action: () => {
        const sortButton = document.querySelector('[data-sort="time"]') as HTMLButtonElement
        sortButton?.click()
      },
      description: "Sort orders by time",
    },
    {
      command: "sort by complexity",
      action: () => {
        const sortButton = document.querySelector('[data-sort="complexity"]') as HTMLButtonElement
        sortButton?.click()
      },
      description: "Sort orders by complexity",
    },
    {
      command: "show help",
      action: () => setShowCommands(true),
      description: "Show voice commands help",
    },
    {
      command: "hide help",
      action: () => setShowCommands(false),
      description: "Hide voice commands help",
    },
  ]

  const { isListening, isSupported, lastCommand, startListening, stopListening, speak } = useVoiceCommands({
    commands: voiceCommands,
    enabled: true,
  })

  if (!isSupported) {
    return (
      <Card className="bg-card border-border m-8">
        <CardContent className="p-4">
          <div className="flex items-center gap-2 text-muted-foreground">
            <MicOff className="w-4 h-4" />
            <span className="text-sm">Voice commands not supported in this browser</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="m-8 space-y-4">
      {/* Voice Control Panel */}
      <Card className="bg-card border-border">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                onClick={isListening ? stopListening : startListening}
                variant={isListening ? "destructive" : "default"}
                size="sm"
                className={isListening ? "bg-red-600 hover:bg-red-700" : "bg-orange-500 hover:bg-orange-600"}
              >
                {isListening ? <MicOff className="w-4 h-4 mr-2" /> : <Mic className="w-4 h-4 mr-2" />}
                {isListening ? "Stop Listening" : "Start Voice Control"}
              </Button>

              {isListening && (
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                  <span className="text-sm text-muted-foreground">Listening...</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => speak("Voice control is ready. Say a command to get started.")}
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
            <div className="mt-3 p-2 bg-muted rounded text-sm">
              <span className="text-muted-foreground">Last command: </span>
              <span className="text-orange-500">"{lastCommand}"</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Voice Commands Help */}
      {showCommands && (
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-orange-500 text-lg">Voice Commands</CardTitle>
            <CardDescription>Available voice commands for hands-free operation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {voiceCommands.map((cmd, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                  <div>
                    <Badge variant="outline" className="text-xs mb-1">
                      "{cmd.command}"
                    </Badge>
                    <p className="text-sm text-muted-foreground">{cmd.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded">
              <h4 className="text-orange-600 dark:text-orange-400 font-medium mb-2">Tips for better recognition:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Speak clearly and at normal pace</li>
                <li>• Use exact command phrases</li>
                <li>• Ensure microphone permissions are granted</li>
                <li>• Minimize background noise</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
