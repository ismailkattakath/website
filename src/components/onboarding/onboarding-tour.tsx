import type { ReactNode } from 'react'

/**
 * Onboarding tour — currently a passthrough stub.
 *
 * The original implementation used `onborda`, which peer-depends on Next.js
 * and ships dist files with extensionless relative imports that fail under
 * Vite/Node's strict ESM resolution (used by Astro's static prerender). That
 * makes it incompatible with this stack as-is. Since the guided tour is a UX
 * nicety, not core functionality, this is stubbed rather than blocking the
 * rewrite — re-enable with a Next-independent tour library if wanted.
 */
export function OnboardingTour({ children }: { children: ReactNode }) {
  return <>{children}</>
}

export default OnboardingTour
