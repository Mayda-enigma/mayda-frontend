'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

interface UseVoiceRecordingReturn {
  isRecording: boolean
  isSupported: boolean
  error: string | null
  startRecording: () => Promise<void>
  stopRecording: () => Promise<Blob | null>
}

export function useVoiceRecording(): UseVoiceRecordingReturn {
  const [isRecording, setIsRecording] = useState(false)
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])

  useEffect(() => {
    setIsSupported(
      typeof window !== 'undefined' &&
        !!navigator.mediaDevices?.getUserMedia &&
        !!window.MediaRecorder,
    )

    return () => {
      if (
        mediaRecorderRef.current &&
        mediaRecorderRef.current.state !== 'inactive'
      ) {
        mediaRecorderRef.current.stop()
      }
    }
  }, [])

  const startRecording = useCallback(async () => {
    setError(null)
    chunksRef.current = []

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream, { mimeType: 'audio/webm' })

      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunksRef.current.push(event.data)
        }
      }

      recorder.onerror = () => {
        setError('Recording error occurred')
        setIsRecording(false)
      }

      recorder.onstop = () => {
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorderRef.current = recorder
      recorder.start()
      setIsRecording(true)
    } catch (err) {
      const message =
        err instanceof DOMException && err.name === 'NotAllowedError'
          ? 'Microphone permission denied'
          : 'Could not start recording'
      setError(message)
    }
  }, [])

  const stopRecording = useCallback(async () => {
    const recorder = mediaRecorderRef.current
    if (!recorder || recorder.state === 'inactive') {
      setIsRecording(false)
      return null
    }

    return new Promise<Blob | null>((resolve) => {
      recorder.addEventListener(
        'stop',
        () => {
          const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
          chunksRef.current = []
          setIsRecording(false)
          resolve(blob)
        },
        { once: true },
      )
      recorder.stop()
    })
  }, [])

  return {
    isRecording,
    isSupported,
    error,
    startRecording,
    stopRecording,
  }
}
