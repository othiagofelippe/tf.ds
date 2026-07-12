import { forwardRef } from "react"
import { type VariantProps } from "class-variance-authority"
import { useAnalytics } from "@tfds/analytics"
import { cn } from "../../lib/cn"
import { buttonVariants } from "./button.variants"

interface ButtonProps
  extends
    Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean
  loadingLabel?: string
  analyticsEnabled?: boolean
  analyticsCustomParams?: Record<string, unknown>
  screenName?: string
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      loading = false,
      loadingLabel = "Loading...",
      disabled,
      children,
      analyticsEnabled = true,
      analyticsCustomParams,
      screenName,
      onClick,
      ...props
    },
    ref,
  ) => {
    const { emit } = useAnalytics(
      screenName !== undefined
        ? { componentName: "button", screenName }
        : { componentName: "button" },
    )

    function handleClick(event: React.MouseEvent<HTMLButtonElement>): void {
      if (analyticsEnabled) {
        emit("component_click", analyticsCustomParams)
      }
      onClick?.(event)
    }

    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }))}
        disabled={disabled ?? loading}
        aria-busy={loading}
        aria-label={loading ? loadingLabel : undefined}
        onClick={handleClick}
        {...props}
      >
        {children}
      </button>
    )
  },
)

Button.displayName = "Button"

export { Button, type ButtonProps }
