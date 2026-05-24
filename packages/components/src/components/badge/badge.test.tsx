import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { Badge } from "./badge"

describe("Badge", () => {
  describe("rendering", () => {
    it("renders children", () => {
      render(<Badge>Active</Badge>)
      expect(screen.getByText("Active")).toBeInTheDocument()
    })

    it("renders as a <span> element", () => {
      render(<Badge>Tag</Badge>)
      expect(screen.getByText("Tag").tagName).toBe("SPAN")
    })
  })

  describe("variant prop", () => {
    it("applies default variant by default", () => {
      render(<Badge>Default</Badge>)
      expect(screen.getByText("Default").className).toContain("bg-bg-muted")
    })

    it("applies success variant", () => {
      render(<Badge variant="success">Success</Badge>)
      expect(screen.getByText("Success").className).toContain("bg-feedback-success-subtle")
    })

    it("applies warning variant", () => {
      render(<Badge variant="warning">Warning</Badge>)
      expect(screen.getByText("Warning").className).toContain("bg-feedback-warning-subtle")
    })

    it("applies error variant", () => {
      render(<Badge variant="error">Error</Badge>)
      expect(screen.getByText("Error").className).toContain("bg-feedback-error-subtle")
    })

    it("applies info variant", () => {
      render(<Badge variant="info">Info</Badge>)
      expect(screen.getByText("Info").className).toContain("bg-action-primary-subtle")
    })
  })

  describe("size prop", () => {
    it("applies md size by default", () => {
      render(<Badge>Default size</Badge>)
      expect(screen.getByText("Default size").className).toContain("--tfds-font-size-sm")
    })

    it("applies sm size classes", () => {
      render(<Badge size="sm">Small</Badge>)
      expect(screen.getByText("Small").className).toContain("--tfds-font-size-xs")
    })
  })

  describe("forwardRef", () => {
    it("forwards ref to the span element", () => {
      const ref = createRef<HTMLSpanElement>()
      render(<Badge ref={ref}>Badge</Badge>)
      expect(ref.current).toBeInstanceOf(HTMLSpanElement)
    })
  })
})
