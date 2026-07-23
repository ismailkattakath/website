/**
 * Local no-op stub for `@ismailkattakath/mediapipe-react/genai` (see ./index.tsx).
 *
 * `useLlm()` returns an inert "unavailable" state so on-device generation is disabled
 * gracefully — callers see progress 0 / not-ready and an explanatory error, and fall
 * back to the cloud AI path (@google/genai) instead of crashing.
 */
export interface UseLlmOptions {
  modelPath?: string
}

export function useLlm(_options: UseLlmOptions = {}) {
  return {
    generate: (_prompt: string): void => {},
    output: '',
    isLoading: false,
    progress: 0,
    error: 'On-device AI is unavailable in this build.' as string | null,
  }
}
