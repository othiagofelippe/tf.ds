import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { Typography } from "./typography"

describe("Typography", () => {
  describe("rendering", () => {
    it("renders children", () => {
      render(<Typography>Hello world</Typography>)
      expect(screen.getByText("Hello world")).toBeInTheDocument()
    })

    it("renders as <p> by default", () => {
      render(<Typography>Text</Typography>)
      expect(screen.getByText("Text").tagName).toBe("P")
    })

    it("renders as <h1> when as='h1'", () => {
      render(<Typography as="h1">Title</Typography>)
      expect(screen.getByRole("heading", { level: 1, name: "Title" })).toBeInTheDocument()
    })

    it("renders as <span> when as='span'", () => {
      render(<Typography as="span">Inline</Typography>)
      expect(screen.getByText("Inline").tagName).toBe("SPAN")
    })
  })

  describe("variant prop", () => {
    it("applies display-lg classes", () => {
      render(<Typography variant="display-lg">Display</Typography>)
      const el = screen.getByText("Display")
      expect(el.className).toContain("--tfds-font-size-5xl")
    })

    it("applies heading-md classes", () => {
      render(<Typography variant="heading-md">Heading</Typography>)
      const el = screen.getByText("Heading")
      expect(el.className).toContain("--tfds-font-size-lg")
    })

    it("applies body-sm classes", () => {
      render(<Typography variant="body-sm">Body</Typography>)
      const el = screen.getByText("Body")
      expect(el.className).toContain("--tfds-font-size-sm")
    })

    it("applies code variant with mono family", () => {
      render(<Typography variant="code">const x = 1</Typography>)
      const el = screen.getByText("const x = 1")
      expect(el.className).toContain("--tfds-font-family-mono")
    })

    it("applies overline with uppercase class", () => {
      render(<Typography variant="overline">Label</Typography>)
      expect(screen.getByText("Label").className).toContain("uppercase")
    })
  })

  describe("color prop", () => {
    it("applies primary color by default", () => {
      render(<Typography>Text</Typography>)
      expect(screen.getByText("Text").className).toContain("--tfds-color-text-primary")
    })

    it("applies error color", () => {
      render(<Typography color="error">Error</Typography>)
      expect(screen.getByText("Error").className).toContain("--tfds-color-text-error")
    })

    it("applies success color", () => {
      render(<Typography color="success">Success</Typography>)
      expect(screen.getByText("Success").className).toContain("--tfds-color-text-success")
    })

    it("applies warning color", () => {
      render(<Typography color="warning">Warning</Typography>)
      expect(screen.getByText("Warning").className).toContain("--tfds-color-text-warning")
    })
  })

  describe("align prop", () => {
    it("applies text-left by default", () => {
      render(<Typography>Text</Typography>)
      expect(screen.getByText("Text").className).toContain("text-left")
    })

    it("applies text-center when align='center'", () => {
      render(<Typography align="center">Text</Typography>)
      expect(screen.getByText("Text").className).toContain("text-center")
    })

    it("applies text-right when align='right'", () => {
      render(<Typography align="right">Text</Typography>)
      expect(screen.getByText("Text").className).toContain("text-right")
    })
  })

  describe("truncate prop", () => {
    it("applies truncate class when truncate is true", () => {
      render(<Typography truncate>Long text</Typography>)
      expect(screen.getByText("Long text").className).toContain("truncate")
    })

    it("does not apply truncate class by default", () => {
      render(<Typography>Text</Typography>)
      expect(screen.getByText("Text").className).not.toContain("truncate")
    })
  })

  describe("forwardRef", () => {
    it("forwards ref to the DOM element", () => {
      const ref = createRef<HTMLElement>()
      render(<Typography ref={ref}>Text</Typography>)
      expect(ref.current).toBeInstanceOf(HTMLElement)
    })
  })
})
