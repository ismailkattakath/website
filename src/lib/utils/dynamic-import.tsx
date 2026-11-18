import { lazy, Suspense, type ComponentType, type ReactElement } from 'react'

interface DynamicOptions {
  loading?: () => ReactElement | null
  ssr?: boolean
}

/**
 * Minimal next/dynamic-compatible shim: wraps React.lazy in Suspense so
 * existing `dynamic(() => import('./x'), { loading: () => <Y/> })` call
 * sites port unchanged. `ssr` is accepted for signature compatibility and
 * ignored (Astro islands never render this on the server).
 */
export default function dynamic<P extends object>(
  loader: () => Promise<{ default: ComponentType<P> } | ComponentType<P>>,
  options: DynamicOptions = {}
) {
  const LazyComponent = lazy(async () => {
    const mod = await loader()
    return 'default' in mod ? mod : { default: mod }
  })

  const Wrapped = (props: P) => (
    <Suspense fallback={options.loading ? options.loading() : null}>
      <LazyComponent {...props} />
    </Suspense>
  )
  Wrapped.displayName = 'DynamicImport'
  return Wrapped
}
