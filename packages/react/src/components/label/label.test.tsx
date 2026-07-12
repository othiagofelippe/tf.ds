import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { Label } from "./label"

describe("Label", () => {
  describe("rendering", () => {
    it("renders children", () => {
      render(<Label>Email</Label>)
      expect(screen.getByText("Email")).toBeInTheDocument()
    })

    it("renders as a <label> element", () => {
      render(<Label>Name</Label>)
      expect(screen.getByText("Name").tagName).toBe("LABEL")
    })

    it("associates with input via htmlFor", () => {
      render(
        <>
          <Label htmlFor="email">Email</Label>
          <input id="email" />
        </>,
      )
      expect(screen.getByLabelText("Email")).toBeInTheDocument()
    })
  })

  describe("size variant", () => {
    it("applies sm size classes", () => {
      render(<Label size="sm">Small</Label>)
      expect(screen.getByText("Small").className).toContain("--tfds-font-size-xs")
    })

    it("applies md size by default", () => {
      render(<Label>Default</Label>)
      expect(screen.getByText("Default").className).toContain("--tfds-font-size-sm")
    })

    it("applies lg size classes", () => {
      render(<Label size="lg">Large</Label>)
      expect(screen.getByText("Large").className).toContain("--tfds-font-size-md")
    })
  })

  describe("disabled state", () => {
    it("applies opacity class when disabled", () => {
      render(<Label disabled>Disabled</Label>)
      expect(screen.getByText("Disabled").className).toContain("opacity-disabled")
    })

    it("does not apply opacity class by default", () => {
      render(<Label>Active</Label>)
      expect(screen.getByText("Active").className).not.toContain("opacity-disabled")
    })
  })

  describe("forwardRef", () => {
    it("forwards ref to the label element", () => {
      const ref = createRef<HTMLLabelElement>()
      render(<Label ref={ref}>Label</Label>)
      expect(ref.current).toBeInstanceOf(HTMLLabelElement)
    })
  })
})
