import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { AnalyticsProvider, type TrackAdapter } from "@tfds/analytics"
import { Button } from "./button"

describe("Button", () => {
  describe("rendering", () => {
    it("renders children", () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
    })

    it("renders all variants without errors", () => {
      const variants = ["primary", "secondary", "outline", "ghost", "destructive", "link"] as const
      for (const variant of variants) {
        const { unmount } = render(<Button variant={variant}>{variant}</Button>)
        expect(screen.getByRole("button", { name: variant })).toBeInTheDocument()
        unmount()
      }
    })

    it("renders all sizes without errors", () => {
      const sizes = ["sm", "md", "lg", "icon"] as const
      for (const size of sizes) {
        const { unmount } = render(<Button size={size}>{size}</Button>)
        expect(screen.getByRole("button", { name: size })).toBeInTheDocument()
        unmount()
      }
    })
  })

  describe("disabled state", () => {
    it("is disabled when disabled prop is true", () => {
      render(<Button disabled>Click me</Button>)
      expect(screen.getByRole("button")).toBeDisabled()
    })

    it("does not fire onClick when disabled", async () => {
      const handleClick = vi.fn()
      render(
        <Button disabled onClick={handleClick}>
          Click me
        </Button>,
      )
      await userEvent.click(screen.getByRole("button"))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe("loading state", () => {
    it("is disabled when loading is true", () => {
      render(<Button loading>Click me</Button>)
      expect(screen.getByRole("button")).toBeDisabled()
    })

    it("has aria-busy when loading", () => {
      render(<Button loading>Click me</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true")
    })

    it("uses default loading label as aria-label", () => {
      render(<Button loading>Click me</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Loading...")
    })

    it("uses custom loading label when provided", () => {
      render(
        <Button loading loadingLabel="Carregando...">
          Click me
        </Button>,
      )
      expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Carregando...")
    })

    it("does not have aria-busy when not loading", () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole("button")).not.toHaveAttribute("aria-busy", "true")
    })
  })

  describe("interactions", () => {
    it("fires onClick when clicked", async () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      await userEvent.click(screen.getByRole("button"))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("forwardRef", () => {
    it("forwards ref to the button element", () => {
      const ref = createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Click me</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })

  describe("analytics", () => {
    it("emits component_click on click when analyticsDefault is on", async () => {
      const adapter: TrackAdapter = vi.fn()
      render(
        <AnalyticsProvider adapter={adapter} screenName="home">
          <Button>Click me</Button>
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

    it("does not emit when analyticsEnabled is false", async () => {
      const adapter: TrackAdapter = vi.fn()
      render(
        <AnalyticsProvider adapter={adapter} screenName="home">
          <Button analyticsEnabled={false}>Click me</Button>
        </AnalyticsProvider>,
      )
      await userEvent.click(screen.getByRole("button"))
      expect(adapter).not.toHaveBeenCalled()
    })

    it("attaches analyticsCustomParams to the emitted event", async () => {
      const adapter: TrackAdapter = vi.fn()
      render(
        <AnalyticsProvider adapter={adapter} screenName="home">
          <Button analyticsCustomParams={{ label: "save" }}>Click me</Button>
        </AnalyticsProvider>,
      )
      await userEvent.click(screen.getByRole("button"))
      expect(adapter).toHaveBeenCalledWith(expect.objectContaining({ label: "save" }))
    })

    it("overrides the Provider's screenName when screenName prop is passed", async () => {
      const adapter: TrackAdapter = vi.fn()
      render(
        <AnalyticsProvider adapter={adapter} screenName="home">
          <Button screenName="checkout">Click me</Button>
        </AnalyticsProvider>,
      )
      await userEvent.click(screen.getByRole("button"))
      expect(adapter).toHaveBeenCalledWith(expect.objectContaining({ screen_name: "checkout" }))
    })

    it("renders and handles clicks normally without an AnalyticsProvider in the tree", async () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      await userEvent.click(screen.getByRole("button"))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("focus", () => {
    it("receives keyboard focus", async () => {
      render(<Button>Click me</Button>)
      await userEvent.tab()
      expect(screen.getByRole("button")).toHaveFocus()
    })

    it("has a visible focus ring class", () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole("button").className).toContain("focus-visible:ring-interactive-focus")
    })
  })
})
