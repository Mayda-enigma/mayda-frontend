import type { TranscriptDto, Transcript } from '../types'

export const toTranscript = (dto: TranscriptDto): Transcript => ({
  text: dto.text,
  confidence: dto.confidence,
  language: dto.language,
})
