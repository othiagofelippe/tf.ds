import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { HStack } from "./hstack"

describe("HStack", () => {
  describe("rendering", () => {
    it("renders children", () => {
      render(<HStack>Content</HStack>)
      expect(screen.getByText("Content")).toBeInTheDocument()
    })

    it("renders as <div> by default", () => {
      render(<HStack>Content</HStack>)
      expect(screen.getByText("Content").tagName).toBe("DIV")
    })

    it("renders as <section> when as='section'", () => {
      render(<HStack as="section">Content</HStack>)
      expect(screen.getByText("Content").tagName).toBe("SECTION")
    })

    it("renders as <ul> when as='ul'", () => {
      render(<HStack as="ul">Content</HStack>)
      expect(screen.getByText("Content").tagName).toBe("UL")
    })

    it("renders as <main> when as='main'", () => {
      render(<HStack as="main">Content</HStack>)
      expect(screen.getByText("Content").tagName).toBe("MAIN")
    })
  })

  describe("base classes", () => {
    it("always applies flex class", () => {
      render(<HStack>Content</HStack>)
      expect(screen.getByText("Content").className).toContain("flex")
    })

    it("always applies flex-row class", () => {
      render(<HStack>Content</HStack>)
      expect(screen.getByText("Content").className).toContain("flex-row")
    })
  })

  describe("gap prop", () => {
    it("applies gap-0 by default", () => {
      render(<HStack>Content</HStack>)
      expect(screen.getByText("Content").className).toContain("gap-0")
    })

    it("applies gap-4 when gap='4'", () => {
      render(<HStack gap="4">Content</HStack>)
      expect(screen.getByText("Content").className).toContain("gap-4")
    })
  })

  describe("align prop", () => {
    it("applies items-stretch by default", () => {
      render(<HStack>Content</HStack>)
      expect(screen.getByText("Content").className).toContain("items-stretch")
    })

    it("applies items-center when align='center'", () => {
      render(<HStack align="center">Content</HStack>)
      expect(screen.getByText("Content").className).toContain("items-center")
    })
  })

  describe("justify prop", () => {
    it("applies justify-between when justify='between'", () => {
      render(<HStack justify="between">Content</HStack>)
      expect(screen.getByText("Content").className).toContain("justify-between")
    })
  })

  describe("wrap prop", () => {
    it("does not apply flex-wrap by default", () => {
      render(<HStack>Content</HStack>)
      expect(screen.getByText("Content").className).not.toContain("flex-wrap")
    })

    it("does not apply flex-wrap when wrap={false}", () => {
      render(<HStack wrap={false}>Content</HStack>)
      expect(screen.getByText("Content").className).not.toContain("flex-wrap")
    })

    it("applies flex-wrap when wrap={true}", () => {
      render(<HStack wrap={true}>Content</HStack>)
      expect(screen.getByText("Content").className).toContain("flex-wrap")
    })
  })

  describe("className", () => {
    it("merges custom className with CVA classes", () => {
      render(<HStack className="ml-8">Content</HStack>)
      const element = screen.getByText("Content")
      expect(element.className).toContain("ml-8")
      expect(element.className).toContain("flex")
      expect(element.className).toContain("flex-row")
    })
  })

  describe("forwardRef", () => {
    it("forwards ref to the underlying DOM element", () => {
      const ref = createRef<HTMLElement>()
      render(<HStack ref={ref}>Content</HStack>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })
})
