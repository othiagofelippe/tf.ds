export type EventType =
  | "component_display"
  | "component_click"
  | "component_change"
  | "component_view"
  | "component_error"

export interface AnalyticsEvent {
  event: EventType
  component_name: string
  screen_name: string
  ds_version: string
  parent_component?: string
  [key: string]: unknown
}

export type TrackAdapter = (event: AnalyticsEvent) => void
