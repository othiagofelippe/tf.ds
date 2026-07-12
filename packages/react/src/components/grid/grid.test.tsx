import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { Grid } from "./grid"

describe("Grid", () => {
  describe("rendering", () => {
    it("renders children", () => {
      render(<Grid>Content</Grid>)
      expect(screen.getByText("Content")).toBeInTheDocument()
    })

    it("renders as <div> by default", () => {
      render(<Grid>Content</Grid>)
      expect(screen.getByText("Content").tagName).toBe("DIV")
    })

    it("renders as <section> when as='section'", () => {
      render(<Grid as="section">Content</Grid>)
      expect(screen.getByText("Content").tagName).toBe("SECTION")
    })

    it("renders as <ul> when as='ul'", () => {
      render(<Grid as="ul">Content</Grid>)
      expect(screen.getByText("Content").tagName).toBe("UL")
    })
  })

  describe("base classes", () => {
    it("always applies grid class", () => {
      render(<Grid>Content</Grid>)
      expect(screen.getByText("Content").className).toContain("grid")
    })
  })

  describe("gap prop", () => {
    it("applies gap-0 by default", () => {
      render(<Grid>Content</Grid>)
      expect(screen.getByText("Content").className).toContain("gap-0")
    })

    it("applies gap-6 when gap='6'", () => {
      render(<Grid gap="6">Content</Grid>)
      expect(screen.getByText("Content").className).toContain("gap-6")
    })
  })

  describe("cols prop", () => {
    it("applies grid-cols-3 when cols is a number", () => {
      render(<Grid cols={3}>Content</Grid>)
      expect(screen.getByText("Content").className).toContain("grid-cols-3")
    })

    it("applies no cols class when cols is omitted", () => {
      render(<Grid>Content</Grid>)
      expect(screen.getByText("Content").className).not.toContain("grid-cols-")
    })

    it("applies responsive cols classes with breakpoint prefixes", () => {
      render(<Grid cols={{ base: 1, md: 2, lg: 4 }}>Content</Grid>)
      const className = screen.getByText("Content").className
      expect(className).toContain("grid-cols-1")
      expect(className).toContain("md:grid-cols-2")
      expect(className).toContain("lg:grid-cols-4")
    })

    it("applies sm breakpoint class", () => {
      render(<Grid cols={{ sm: 2 }}>Content</Grid>)
      expect(screen.getByText("Content").className).toContain("sm:grid-cols-2")
    })
  })

  describe("className", () => {
    it("merges custom className with CVA classes", () => {
      render(<Grid className="mt-8">Content</Grid>)
      const element = screen.getByText("Content")
      expect(element.className).toContain("mt-8")
      expect(element.className).toContain("grid")
    })
  })

  describe("forwardRef", () => {
    it("forwards ref to the underlying DOM element", () => {
      const ref = createRef<HTMLElement>()
      render(<Grid ref={ref}>Content</Grid>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })
})
