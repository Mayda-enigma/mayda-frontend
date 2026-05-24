"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card"
import { Button } from "@/shared/ui/button"
import { Mic, MicOff, Volume2 } from "lucide-react"

interface VoiceControlProps {
  isActive: boolean
  onToggle: (active: boolean) => void
  onStatusUpdate: (status: string) => void
}

export function VoiceControl({ isActive, onToggle, onStatusUpdate }: VoiceControlProps) {
  const [isListening, setIsListening] = useState(false)
  const [lastCommand, setLastCommand] = useState("")

  // Mock voice recognition - in real app would use Web Speech API
  useEffect(() => {
    if (!isActive) return

    const mockCommands = ["commencer la commande", "marquer prêt", "mettre en pause", "étape suivante"]
    const interval = setInterval(() => {
      if (Math.random() > 0.9) {
        const command = mockCommands[Math.floor(Math.random() * mockCommands.length)]
        setLastCommand(command)
        handleVoiceCommand(command)
      }
    }, 5000)

    return () => clearInterval(interval)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  const handleVoiceCommand = (command: string) => {
    switch (command.toLowerCase()) {
      case "commencer la commande":
        onStatusUpdate("in-progress")
        break
      case "marquer prêt":
        onStatusUpdate("ready")
        break
      case "mettre en pause":
        // Handle pause logic
        break
      case "étape suivante":
        // Handle next step logic
        break
    }
  }

  const toggleVoiceControl = () => {
    onToggle(!isActive)
    setIsListening(!isActive)
  }

  return (
    <Card className="bg-gray-800 border-gray-700 ">
      <CardHeader>
        <CardTitle className="text-white flex items-center gap-2">
          <Volume2 className="w-5 h-5" />
          Contrôle vocal
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={toggleVoiceControl}
          className={`w-full ${isActive ? "bg-success hover:bg-success/90" : "bg-primary hover:bg-primary/90"}`}
        >
          {isActive ? <Mic className="w-4 h-4 mr-2" /> : <MicOff className="w-4 h-4 mr-2" />}
          {isActive ? "Contrôle vocal actif" : "Activer le contrôle vocal"}
        </Button>

        {isActive && (
          <div className="space-y-2">
            <div className="text-sm text-gray-400">Commandes disponibles :</div>
            <div className="text-xs text-gray-500 space-y-1">
              <div>&bull; &quot;Commencer la commande&quot; - Démarrer la préparation</div>
              <div>&bull; &quot;Marquer prêt&quot; - Terminer la commande</div>
              <div>&bull; &quot;Étape suivante&quot; - Avancer le plat en cours</div>
              <div>&bull; &quot;Mettre en pause&quot; - Mettre en pause la préparation</div>
            </div>
            {lastCommand && (
              <div className="mt-3 p-2 bg-accent-blue/10 border-accent-blue/30 rounded text-sm">
                <div className="text-accent-blue font-medium">Dernière commande :</div>
                <div className="text-blue-200">&quot;{lastCommand}&quot;</div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
