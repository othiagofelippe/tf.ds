import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
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
