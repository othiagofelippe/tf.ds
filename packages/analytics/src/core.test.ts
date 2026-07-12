import { describe, it, expect, vi } from "vitest"
import { buildAnalyticsEvent, emitAnalyticsEvent, DS_VERSION } from "./core"
import pkg from "../package.json"

describe("buildAnalyticsEvent", () => {
  it("assembles the payload with event, component_name, screen_name and ds_version", () => {
    const result = buildAnalyticsEvent({
      event: "component_click",
      componentName: "button",
      screenName: "home",
    })

    expect(result.event).toBe("component_click")
    expect(result.component_name).toBe("button")
    expect(result.screen_name).toBe("home")
    expect(result.ds_version).toBe(pkg.version)
  })

  it("exposes DS_VERSION matching the package version", () => {
    expect(DS_VERSION).toBe(pkg.version)
  })

  it("includes parent_component when provided", () => {
    const result = buildAnalyticsEvent({
      event: "component_click",
      componentName: "button",
      screenName: "home",
      parentComponent: "card",
    })

    expect(result.parent_component).toBe("card")
  })

  it("omits parent_component when not provided", () => {
    const result = buildAnalyticsEvent({
      event: "component_click",
      componentName: "button",
      screenName: "home",
    })

    expect(result).not.toHaveProperty("parent_component")
  })

  it("merges customParams without letting them override the core payload fields", () => {
    const result = buildAnalyticsEvent({
      event: "component_click",
      componentName: "button",
      screenName: "home",
      customParams: { component_name: "hijacked", label: "save" },
    })

    expect(result.component_name).toBe("button")
    expect(result.label).toBe("save")
  })
})

describe("emitAnalyticsEvent", () => {
  const event = buildAnalyticsEvent({
    event: "component_click",
    componentName: "button",
    screenName: "home",
  })

  it("calls the adapter with the built event", () => {
    const adapter = vi.fn()
    emitAnalyticsEvent(adapter, event)
    expect(adapter).toHaveBeenCalledWith(event)
  })

  it("does not call anything and does not throw when there is no adapter", () => {
    expect(() => {
      emitAnalyticsEvent(undefined, event)
    }).not.toThrow()
  })

  it("swallows errors thrown by the adapter without letting them propagate", () => {
    const adapter = vi.fn(() => {
      throw new Error("adapter exploded")
    })

    expect(() => {
      emitAnalyticsEvent(adapter, event)
    }).not.toThrow()
    expect(adapter).toHaveBeenCalledTimes(1)
  })

  it("emits two distinct interactions independently, each with its own event type", () => {
    const adapter = vi.fn()
    const clickEvent = buildAnalyticsEvent({
      event: "component_click",
      componentName: "button",
      screenName: "home",
    })
    const changeEvent = buildAnalyticsEvent({
      event: "component_change",
      componentName: "input",
      screenName: "home",
    })

    emitAnalyticsEvent(adapter, clickEvent)
    emitAnalyticsEvent(adapter, changeEvent)

    expect(adapter).toHaveBeenCalledTimes(2)
    expect(adapter).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({ event: "component_click" }),
    )
    expect(adapter).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({ event: "component_change" }),
    )
  })
})
