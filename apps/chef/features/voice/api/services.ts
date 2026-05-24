import { ApiError, clearAuth, redirectToLogin } from '@/shared/api/client'
import { API_URL } from '@/shared/lib/env'
import type { TranscriptDto } from '../types'

export const voiceService = {
  transcribe: async (audioBlob: Blob): Promise<TranscriptDto> => {
    const formData = new FormData()
    formData.append('audio', audioBlob, 'recording.webm')

    const token =
      typeof window !== 'undefined'
        ? localStorage.getItem('mayda_token')
        : null
    const headers: Record<string, string> = {
      'ngrok-skip-browser-warning': 'true',
    }
    if (token) {
      headers['Authorization'] = `Bearer ${token}`
    }

    const res = await fetch(`${API_URL}/ai/voice/transcribe`, {
      method: 'POST',
      body: formData,
      headers,
    })

    if (res.status === 401) {
      clearAuth()
      redirectToLogin()
      throw new ApiError(
        res.status,
        'Session expired. Please log in again.',
      )
    }

    if (!res.ok) {
      const body = await res.json().catch(() => null)
      throw new ApiError(res.status, body)
    }

    return res.json() as Promise<TranscriptDto>
  },
}
