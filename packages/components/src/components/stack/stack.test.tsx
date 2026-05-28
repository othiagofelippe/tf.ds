import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { Stack } from "./stack"

describe("Stack", () => {
  describe("rendering", () => {
    it("renders children", () => {
      render(<Stack>Content</Stack>)
      expect(screen.getByText("Content")).toBeInTheDocument()
    })

    it("renders as <div> by default", () => {
      render(<Stack>Content</Stack>)
      expect(screen.getByText("Content").tagName).toBe("DIV")
    })

    it("renders as <section> when as='section'", () => {
      render(<Stack as="section">Content</Stack>)
      expect(screen.getByText("Content").tagName).toBe("SECTION")
    })

    it("renders as <ul> when as='ul'", () => {
      render(<Stack as="ul">Content</Stack>)
      expect(screen.getByText("Content").tagName).toBe("UL")
    })

    it("renders as <main> when as='main'", () => {
      render(<Stack as="main">Content</Stack>)
      expect(screen.getByText("Content").tagName).toBe("MAIN")
    })
  })

  describe("base classes", () => {
    it("always applies flex class", () => {
      render(<Stack>Content</Stack>)
      expect(screen.getByText("Content").className).toContain("flex")
    })

    it("always applies flex-col class", () => {
      render(<Stack>Content</Stack>)
      expect(screen.getByText("Content").className).toContain("flex-col")
    })
  })

  describe("gap prop", () => {
    it("applies gap-0 by default", () => {
      render(<Stack>Content</Stack>)
      expect(screen.getByText("Content").className).toContain("gap-0")
    })

    it("applies gap-4 when gap='4'", () => {
      render(<Stack gap="4">Content</Stack>)
      expect(screen.getByText("Content").className).toContain("gap-4")
    })
  })

  describe("align prop", () => {
    it("applies items-stretch by default", () => {
      render(<Stack>Content</Stack>)
      expect(screen.getByText("Content").className).toContain("items-stretch")
    })

    it("applies items-center when align='center'", () => {
      render(<Stack align="center">Content</Stack>)
      expect(screen.getByText("Content").className).toContain("items-center")
    })
  })

  describe("justify prop", () => {
    it("applies justify-between when justify='between'", () => {
      render(<Stack justify="between">Content</Stack>)
      expect(screen.getByText("Content").className).toContain("justify-between")
    })
  })

  describe("forwardRef", () => {
    it("forwards ref to the underlying DOM element", () => {
      const ref = createRef<HTMLElement>()
      render(<Stack ref={ref}>Content</Stack>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })
})
