import { useContext } from "react"
import { ParentComponentContext } from "./context"
import { buildAnalyticsEvent, emitAnalyticsEvent } from "./core"
import { useAnalyticsContext } from "./provider"
import type { EventType } from "./types"

export interface UseAnalyticsOptions {
  componentName: string
  screenName?: string
}

export interface UseAnalyticsResult {
  emit: (event: EventType, customParams?: Record<string, unknown>) => void
}

export function useAnalytics({
  componentName,
  screenName,
}: UseAnalyticsOptions): UseAnalyticsResult {
  const { adapter, screenName: providerScreenName } = useAnalyticsContext()
  const parentComponent = useContext(ParentComponentContext)

  function emit(event: EventType, customParams?: Record<string, unknown>): void {
    const builtEvent = buildAnalyticsEvent({
      event,
      componentName,
      screenName: screenName ?? providerScreenName,
      ...(parentComponent !== undefined ? { parentComponent } : {}),
      ...(customParams !== undefined ? { customParams } : {}),
    })
    emitAnalyticsEvent(adapter, builtEvent)
  }

  return { emit }
}
