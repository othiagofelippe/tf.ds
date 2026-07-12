import { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import { cn } from "../../lib/cn"
import { buttonVariants } from "./button.variants"

interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  loadingLabel?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant, size, loading = false, loadingLabel = "Loading...", disabled, children, ...props },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }))}
        disabled={disabled ?? loading}
        aria-busy={loading}
        aria-label={loading ? loadingLabel : undefined}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button, type ButtonProps }
