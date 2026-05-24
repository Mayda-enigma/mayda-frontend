export const voiceKeys = {
  all: ['voice'] as const,
  transcribe: () => [...voiceKeys.all, 'transcribe'] as const,
}
