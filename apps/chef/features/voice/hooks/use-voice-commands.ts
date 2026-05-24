"use client"

import { useEffect, useRef, useState } from "react"
import type SpeechRecognition from "speech-recognition"

interface VoiceCommand {
  command: string
  action: () => void
  description: string
}

interface UseVoiceCommandsProps {
  commands: VoiceCommand[]
  enabled?: boolean
}

export function useVoiceCommands({ commands, enabled = true }: UseVoiceCommandsProps) {
  const [isListening, setIsListening] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [lastCommand, setLastCommand] = useState<string>("")
  const recognitionRef = useRef<SpeechRecognition | null>(null)

  useEffect(() => {
    // Check if speech recognition is supported
    if (typeof window !== "undefined") {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
      if (SpeechRecognition) {
        setIsSupported(true)
        recognitionRef.current = new SpeechRecognition()

        const recognition = recognitionRef.current
        recognition.continuous = true
        recognition.interimResults = false
        recognition.lang = "fr-FR"

        recognition.onstart = () => {
          setIsListening(true)
        }

        recognition.onend = () => {
          setIsListening(false)
        }

        recognition.onresult = (event) => {
          const transcript = event.results[event.results.length - 1][0].transcript.toLowerCase().trim()
          setLastCommand(transcript)

          // Find matching command
          const matchedCommand = commands.find(
            (cmd) => transcript.includes(cmd.command.toLowerCase()) || cmd.command.toLowerCase().includes(transcript),
          )

          if (matchedCommand) {
            matchedCommand.action()
            // Provide audio feedback
            speak(`Commande exécutée : ${matchedCommand.description}`)
          }
        }

        recognition.onerror = (event) => {
          console.error("Speech recognition error:", event.error)
          setIsListening(false)
        }
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [commands])

  const startListening = () => {
    if (recognitionRef.current && enabled && !isListening) {
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }
  }

  const speak = (text: string) => {
    if (typeof window !== "undefined" && window.speechSynthesis) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "fr-FR"
      utterance.rate = 0.9
      utterance.pitch = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  return {
    isListening,
    isSupported,
    lastCommand,
    startListening,
    stopListening,
    speak,
  }
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    SpeechRecognition: typeof SpeechRecognition
    webkitSpeechRecognition: typeof SpeechRecognition
  }
}
