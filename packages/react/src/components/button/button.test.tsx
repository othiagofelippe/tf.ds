import { describe, it, expect, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createRef } from "react"
import { Button } from "./button"

describe("Button", () => {
  describe("rendering", () => {
    it("renders children", () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument()
    })

    it("renders all variants without errors", () => {
      const variants = ["primary", "secondary", "outline", "ghost", "destructive", "link"] as const
      for (const variant of variants) {
        const { unmount } = render(<Button variant={variant}>{variant}</Button>)
        expect(screen.getByRole("button", { name: variant })).toBeInTheDocument()
        unmount()
      }
    })

    it("renders all sizes without errors", () => {
      const sizes = ["sm", "md", "lg", "icon"] as const
      for (const size of sizes) {
        const { unmount } = render(<Button size={size}>{size}</Button>)
        expect(screen.getByRole("button", { name: size })).toBeInTheDocument()
        unmount()
      }
    })
  })

  describe("disabled state", () => {
    it("is disabled when disabled prop is true", () => {
      render(<Button disabled>Click me</Button>)
      expect(screen.getByRole("button")).toBeDisabled()
    })

    it("does not fire onClick when disabled", async () => {
      const handleClick = vi.fn()
      render(
        <Button disabled onClick={handleClick}>
          Click me
        </Button>,
      )
      await userEvent.click(screen.getByRole("button"))
      expect(handleClick).not.toHaveBeenCalled()
    })
  })

  describe("loading state", () => {
    it("is disabled when loading is true", () => {
      render(<Button loading>Click me</Button>)
      expect(screen.getByRole("button")).toBeDisabled()
    })

    it("has aria-busy when loading", () => {
      render(<Button loading>Click me</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("aria-busy", "true")
    })

    it("uses default loading label as aria-label", () => {
      render(<Button loading>Click me</Button>)
      expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Loading...")
    })

    it("uses custom loading label when provided", () => {
      render(
        <Button loading loadingLabel="Carregando...">
          Click me
        </Button>,
      )
      expect(screen.getByRole("button")).toHaveAttribute("aria-label", "Carregando...")
    })

    it("does not have aria-busy when not loading", () => {
      render(<Button>Click me</Button>)
      expect(screen.getByRole("button")).not.toHaveAttribute("aria-busy", "true")
    })
  })

  describe("interactions", () => {
    it("fires onClick when clicked", async () => {
      const handleClick = vi.fn()
      render(<Button onClick={handleClick}>Click me</Button>)
      await userEvent.click(screen.getByRole("button"))
      expect(handleClick).toHaveBeenCalledTimes(1)
    })
  })

  describe("forwardRef", () => {
    it("forwards ref to the button element", () => {
      const ref = createRef<HTMLButtonElement>()
      render(<Button ref={ref}>Click me</Button>)
      expect(ref.current).toBeInstanceOf(HTMLButtonElement)
    })
  })
})
