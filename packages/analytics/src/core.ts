import pkg from "../package.json"
import type { AnalyticsEvent, EventType, TrackAdapter } from "./types"

export const DS_VERSION = pkg.version

export interface BuildAnalyticsEventInput {
  event: EventType
  componentName: string
  screenName: string
  parentComponent?: string
  customParams?: Record<string, unknown>
}

export function buildAnalyticsEvent(input: BuildAnalyticsEventInput): AnalyticsEvent {
  return {
    ...(input.customParams ?? {}),
    event: input.event,
    component_name: input.componentName,
    screen_name: input.screenName,
    ds_version: DS_VERSION,
    ...(input.parentComponent !== undefined ? { parent_component: input.parentComponent } : {}),
  }
}

export function emitAnalyticsEvent(adapter: TrackAdapter | undefined, event: AnalyticsEvent): void {
  if (!adapter) return
  try {
    adapter(event)
  } catch {
    // Analytics must never break the UI — errors from the adapter are swallowed (ANA-05).
  }
}
