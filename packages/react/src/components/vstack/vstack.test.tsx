import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import { createRef } from "react"
import { VStack } from "./vstack"

describe("VStack", () => {
  describe("rendering", () => {
    it("renders children", () => {
      render(<VStack>Content</VStack>)
      expect(screen.getByText("Content")).toBeInTheDocument()
    })

    it("renders as <div> by default", () => {
      render(<VStack>Content</VStack>)
      expect(screen.getByText("Content").tagName).toBe("DIV")
    })

    it("renders as <section> when as='section'", () => {
      render(<VStack as="section">Content</VStack>)
      expect(screen.getByText("Content").tagName).toBe("SECTION")
    })

    it("renders as <ul> when as='ul'", () => {
      render(<VStack as="ul">Content</VStack>)
      expect(screen.getByText("Content").tagName).toBe("UL")
    })

    it("renders as <main> when as='main'", () => {
      render(<VStack as="main">Content</VStack>)
      expect(screen.getByText("Content").tagName).toBe("MAIN")
    })
  })

  describe("base classes", () => {
    it("always applies flex class", () => {
      render(<VStack>Content</VStack>)
      expect(screen.getByText("Content").className).toContain("flex")
    })

    it("always applies flex-col class", () => {
      render(<VStack>Content</VStack>)
      expect(screen.getByText("Content").className).toContain("flex-col")
    })
  })

  describe("gap prop", () => {
    it("applies gap-0 by default", () => {
      render(<VStack>Content</VStack>)
      expect(screen.getByText("Content").className).toContain("gap-0")
    })

    it("applies gap-4 when gap='4'", () => {
      render(<VStack gap="4">Content</VStack>)
      expect(screen.getByText("Content").className).toContain("gap-4")
    })
  })

  describe("align prop", () => {
    it("applies items-stretch by default", () => {
      render(<VStack>Content</VStack>)
      expect(screen.getByText("Content").className).toContain("items-stretch")
    })

    it("applies items-center when align='center'", () => {
      render(<VStack align="center">Content</VStack>)
      expect(screen.getByText("Content").className).toContain("items-center")
    })
  })

  describe("justify prop", () => {
    it("applies justify-between when justify='between'", () => {
      render(<VStack justify="between">Content</VStack>)
      expect(screen.getByText("Content").className).toContain("justify-between")
    })
  })

  describe("className", () => {
    it("merges custom className with CVA classes", () => {
      render(<VStack className="mt-8">Content</VStack>)
      const element = screen.getByText("Content")
      expect(element.className).toContain("mt-8")
      expect(element.className).toContain("flex")
      expect(element.className).toContain("flex-col")
    })
  })

  describe("forwardRef", () => {
    it("forwards ref to the underlying DOM element", () => {
      const ref = createRef<HTMLElement>()
      render(<VStack ref={ref}>Content</VStack>)
      expect(ref.current).toBeInstanceOf(HTMLDivElement)
    })
  })
})
