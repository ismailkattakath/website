import React from 'react'

/**
 * Local no-op stub replacing the lost `@ismailkattakath/mediapipe-react` package.
 *
 * The original on-device-AI package (a MediaPipe/Gemma React wrapper) was lost when
 * its publishing account was deleted — it is no longer on npm and no source survives
 * in backups. This stub keeps the app buildable; the on-device-AI feature is inert.
 */
export function MediaPipeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
