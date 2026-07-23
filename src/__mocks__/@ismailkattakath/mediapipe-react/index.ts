import React from 'react'

/**
 * Jest mock for @ismailkattakath/mediapipe-react (main package).
 * The real package uses Web Workers with import.meta.url which Jest cannot handle.
 */
export const MediaPipeProvider = ({ children }: { children: React.ReactNode }) =>
  React.createElement(React.Fragment, null, children)
