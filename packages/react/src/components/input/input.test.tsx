import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { AnalyticsProvider, type TrackAdapter } from "@tfds/analytics"
import { Input } from "./input"

describe("Input", () => {
  describe("rendering", () => {
    it("renders an input element", () => {
      render(<Input aria-label="Name" />)
      expect(screen.getByRole("textbox")).toBeInTheDocument()
    })

    it("renders with placeholder", () => {
      render(<Input placeholder="Enter text" />)
      expect(screen.getByPlaceholderText("Enter text")).toBeInTheDocument()
    })
  })

  describe("user interaction", () => {
    it("accepts typed value", async () => {
      render(<Input aria-label="Name" />)
      const input = screen.getByRole("textbox")
      await userEvent.type(input, "hello")
      expect(input).toHaveValue("hello")
    })
  })

  describe("disabled state", () => {
    it("is disabled when disabled prop is true", () => {
      render(<Input aria-label="Name" disabled />)
      expect(screen.getByRole("textbox")).toBeDisabled()
    })
  })

  describe("status variant", () => {
    it("applies error status classes", () => {
      render(<Input aria-label="Name" status="error" />)
      expect(screen.getByRole("textbox").className).toContain("border-feedback-error")
    })

    it("applies success status classes", () => {
      render(<Input aria-label="Name" status="success" />)
      expect(screen.getByRole("textbox").className).toContain("border-feedback-success")
    })

    it("applies default status by default", () => {
      render(<Input aria-label="Name" />)
      expect(screen.getByRole("textbox").className).toContain("border-border-default")
    })
  })

  describe("size variant", () => {
    it("applies md size by default", () => {
      render(<Input aria-label="Name" />)
      expect(screen.getByRole("textbox").className).toContain("h-10")
    })

    it("applies sm size classes", () => {
      render(<Input aria-label="Name" size="sm" />)
      expect(screen.getByRole("textbox").className).toContain("h-8")
    })

    it("applies lg size classes", () => {
      render(<Input aria-label="Name" size="lg" />)
      expect(screen.getByRole("textbox").className).toContain("h-12")
    })
  })

  describe("analytics", () => {
    it("emits component_change on change when analyticsDefault is on", async () => {
      const adapter: TrackAdapter = vi.fn()
      render(
        <AnalyticsProvider adapter={adapter} screenName="home">
          <Input aria-label="Name" />
        </AnalyticsProvider>,
      )
      await userEvent.type(screen.getByRole("textbox"), "a")
      expect(adapter).toHaveBeenCalledWith(
        expect.objectContaining({
          event: "component_change",
          component_name: "input",
          screen_name: "home",
        }),
      )
    })

    it("does not emit when analyticsEnabled is false", async () => {
      const adapter: TrackAdapter = vi.fn()
      render(
        <AnalyticsProvider adapter={adapter} screenName="home">
          <Input aria-label="Name" analyticsEnabled={false} />
        </AnalyticsProvider>,
      )
      await userEvent.type(screen.getByRole("textbox"), "a")
      expect(adapter).not.toHaveBeenCalled()
    })

    it("attaches analyticsCustomParams to the emitted event", async () => {
      const adapter: TrackAdapter = vi.fn()
      render(
        <AnalyticsProvider adapter={adapter} screenName="home">
          <Input aria-label="Name" analyticsCustomParams={{ field: "email" }} />
        </AnalyticsProvider>,
      )
      await userEvent.type(screen.getByRole("textbox"), "a")
      expect(adapter).toHaveBeenCalledWith(expect.objectContaining({ field: "email" }))
    })

    it("overrides the Provider's screenName when screenName prop is passed", async () => {
      const adapter: TrackAdapter = vi.fn()
      render(
        <AnalyticsProvider adapter={adapter} screenName="home">
          <Input aria-label="Name" screenName="checkout" />
        </AnalyticsProvider>,
      )
      await userEvent.type(screen.getByRole("textbox"), "a")
      expect(adapter).toHaveBeenCalledWith(expect.objectContaining({ screen_name: "checkout" }))
    })

    it("does not leak the typed value into the emitted event (piiRisk medium)", async () => {
      const adapter: TrackAdapter = vi.fn()
      render(
        <AnalyticsProvider adapter={adapter} screenName="home">
          <Input aria-label="Name" />
        </AnalyticsProvider>,
      )
      await userEvent.type(screen.getByRole("textbox"), "secret")
      const calledWith = (adapter as ReturnType<typeof vi.fn>).mock.calls[0]?.[0] as
        | Record<string, unknown>
        | undefined
      expect(calledWith).not.toHaveProperty("value")
    })

    it("renders and handles changes normally without an AnalyticsProvider in the tree", async () => {
      const handleChange = vi.fn()
      render(<Input aria-label="Name" onChange={handleChange} />)
      await userEvent.type(screen.getByRole("textbox"), "a")
      expect(handleChange).toHaveBeenCalled()
    })
  })

  describe("forwardRef", () => {
    it("forwards ref to the input element", () => {
      const ref = createRef<HTMLInputElement>()
      render(<Input ref={ref} aria-label="Name" />)
      expect(ref.current).toBeInstanceOf(HTMLInputElement)
    })
  })

  describe("focus", () => {
    it("receives keyboard focus", async () => {
      render(<Input aria-label="Name" />)
      await userEvent.tab()
      expect(screen.getByRole("textbox")).toHaveFocus()
    })

    it("has a visible focus ring class", () => {
      render(<Input aria-label="Name" />)
      expect(screen.getByRole("textbox").className).toContain(
        "focus-visible:ring-interactive-focus",
      )
    })
  })
})
