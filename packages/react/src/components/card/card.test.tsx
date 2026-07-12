import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { Card } from "./card"

describe("Card", () => {
  describe("rendering", () => {
    it("renders children", () => {
      render(<Card>Content</Card>)
      expect(screen.getByText("Content")).toBeInTheDocument()
    })

    it("renders as a <div> element", () => {
      render(<Card>Content</Card>)
      expect(screen.getByText("Content").tagName).toBe("DIV")
    })
  })

  describe("shadow prop", () => {
    it("applies sm shadow by default", () => {
      render(<Card>Default</Card>)
      expect(screen.getByText("Default").className).toContain("shadow-sm")
    })

    it("applies no shadow class when shadow='none'", () => {
      render(<Card shadow="none">None</Card>)
      expect(screen.getByText("None").className).not.toContain("shadow-")
    })

    it("applies md shadow", () => {
      render(<Card shadow="md">Elevated</Card>)
      expect(screen.getByText("Elevated").className).toContain("shadow-md")
    })
  })

  describe("padding prop", () => {
    it("applies md padding by default", () => {
      render(<Card>Default</Card>)
      expect(screen.getByText("Default").className).toContain("p-6")
    })

    it("applies sm padding", () => {
      render(<Card padding="sm">Small</Card>)
      expect(screen.getByText("Small").className).toContain("p-4")
    })

    it("applies lg padding", () => {
      render(<Card padding="lg">Large</Card>)
      expect(screen.getByText("Large").className).toContain("p-8")
    })

    it("applies no padding when padding='none'", () => {
      render(<Card padding="none">None</Card>)
      expect(screen.getByText("None").className).toContain("p-0")
    })
  })

  describe("forwardRef", () => {
    it("forwards ref to the div element", () => {
      const ref = createRef<HTMLDivElement>()
      render(<Card ref={ref}>Card</Card>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })
})
