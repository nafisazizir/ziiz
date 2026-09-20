import * as React from "react"

// The generic form of useIsMobile, for examples that key on a breakpoint
// other than the sidebar's. Server-renders as `false`, so a component that
// uses it must tolerate the desktop branch appearing one paint late.
export function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const mql = window.matchMedia(query)
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    },
    [query]
  )

  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
}
