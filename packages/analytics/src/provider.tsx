import { createContext, useContext, type ReactNode } from "react"
import type { TrackAdapter } from "./types"

interface AnalyticsContextValue {
  adapter?: TrackAdapter
  screenName: string
}

const AnalyticsContext = createContext<AnalyticsContextValue>({ screenName: "" })

export interface AnalyticsProviderProps {
  adapter?: TrackAdapter
  screenName: string
  children: ReactNode
}

export function AnalyticsProvider({
  adapter,
  screenName,
  children,
}: AnalyticsProviderProps): ReactNode {
  const value: AnalyticsContextValue =
    adapter !== undefined ? { adapter, screenName } : { screenName }
  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>
}

export function useAnalyticsContext(): AnalyticsContextValue {
  return useContext(AnalyticsContext)
}
