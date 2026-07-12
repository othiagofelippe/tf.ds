import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { ReactNode } from "react"
import { AnalyticsProvider } from "./provider"
import { ParentComponentContext } from "./context"
import { useAnalytics } from "./use-analytics"
import type { TrackAdapter } from "./types"

function TrackedButton({ componentName = "button" }: { componentName?: string }): ReactNode {
  const { emit } = useAnalytics({ componentName })
  return <button onClick={() => emit("component_click")}>Click me</button>
}

describe("useAnalytics", () => {
  it("emits an event carrying the Provider's screenName and ds_version through the adapter", async () => {
    const adapter: TrackAdapter = vi.fn()
    render(
      <AnalyticsProvider adapter={adapter} screenName="home">
        <TrackedButton />
      </AnalyticsProvider>,
    )

    await userEvent.click(screen.getByRole("button"))

    expect(adapter).toHaveBeenCalledWith(
      expect.objectContaining({
        event: "component_click",
        component_name: "button",
        screen_name: "home",
      }),
    )
  })

  it("includes parent_component in the event when nested under a DS parent via context", async () => {
    const adapter: TrackAdapter = vi.fn()
    render(
      <AnalyticsProvider adapter={adapter} screenName="home">
        <ParentComponentContext.Provider value="card">
          <TrackedButton />
        </ParentComponentContext.Provider>
      </AnalyticsProvider>,
    )

    await userEvent.click(screen.getByRole("button"))

    expect(adapter).toHaveBeenCalledWith(expect.objectContaining({ parent_component: "card" }))
  })

  it("does not include parent_component when there is no parent in context", async () => {
    const adapter = vi.fn<TrackAdapter>()
    render(
      <AnalyticsProvider adapter={adapter} screenName="home">
        <TrackedButton />
      </AnalyticsProvider>,
    )

    await userEvent.click(screen.getByRole("button"))

    const [event] = adapter.mock.calls[0] as [Record<string, unknown>]
    expect(event).not.toHaveProperty("parent_component")
  })

  it("lets a component override the Provider's screenName", async () => {
    const adapter: TrackAdapter = vi.fn()
    function OverridingButton(): ReactNode {
      const { emit } = useAnalytics({ componentName: "button", screenName: "checkout" })
      return <button onClick={() => emit("component_click")}>Click me</button>
    }

    render(
      <AnalyticsProvider adapter={adapter} screenName="home">
        <OverridingButton />
      </AnalyticsProvider>,
    )

    await userEvent.click(screen.getByRole("button"))

    expect(adapter).toHaveBeenCalledWith(expect.objectContaining({ screen_name: "checkout" }))
  })

  it("renders normally and does not emit or throw when there is no AnalyticsProvider in the tree", async () => {
    render(<TrackedButton />)

    expect(screen.getByRole("button")).toBeInTheDocument()
    await expect(userEvent.click(screen.getByRole("button"))).resolves.not.toThrow()
  })
})
