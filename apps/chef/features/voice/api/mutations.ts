import { useMutation } from '@tanstack/react-query'
import { voiceService } from './services'

export const useTranscribe = () =>
  useMutation({
    mutationFn: (audioBlob: Blob) => voiceService.transcribe(audioBlob),
  })
